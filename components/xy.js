import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { round } from "../public/utils";
import { ticks } from "d3";

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

const tieInPoints = [
  { x: 0, name: "SW Hub Platform", journeyFraction: 0 },
  { x: 5655, name: "SW Hub Tie-in", journeyFraction: 0.15 },
  { x: 37255, name: "BY Hub Tie-in", journeyFraction: 0.75 },
  { x: 66279, name: "BC", journeyFraction: 1 },
];

function getPigPositions({ period, transitTime, timeInRun, journey }) {
  // console.log(arguments[0]);

  const pigs = [];
  if (!period) return pigs;
  function addPig({ x, y, i }) {
    pigs.push({ x, y, i });
  }
  function removePig() {
    pigs.shift();
  }

  // const firstEntry = 2 * period + 1;
  const numPigs = Math.ceil(timeInRun / period);

  // console.log({ numPigs });
  if (!numPigs) return pigs;

  for (let i = 0; i < numPigs; i++) {
    const travelTime = timeInRun - i * period;
    const journeyFraction = travelTime / transitTime;
    // console.log(i, travelTime, journeyFraction);
    if (journeyFraction > 1) continue; // skip if past end

    const jf = round(journeyFraction, 4);
    const coordIdx = journey.findIndex((row) => parseFloat(row[0]) > jf) - 1;
    const coordRow = journey[coordIdx];
    if (coordRow) {
      addPig({ x: parseFloat(coordRow[1]), y: parseFloat(coordRow[2]), i });
    }
  }
  // console.log(pigs);
  return pigs;
}

export default function XY({ period, transitTime, timeInRun, journey, nomax }) {
  const ref = useRef();

  function init() {
    ref.current.innerHTML = "";

    const margin = { top: 50, right: 80, bottom: 80, left: 70 },
      width = ref.current.clientWidth - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom,
      tieInColor = "#ccc",
      tickLabelSize = 14;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    let time = 0;

    d3.csv("xy.csv").then((data) => {
      const xVal = (d) => parseFloat(d.x);
      const yVal = (d) => parseFloat(d.y);

      const x = d3
        .scaleLinear()
        .domain(d3.extent(data, xVal))
        .range([2, width]);
      const y = d3
        .scaleLinear()
        .domain([d3.min(data, yVal) - 10, d3.max(data, yVal)])
        .range([height, 0]);

      const line = d3
        .line()
        .x((d) => x(d.x))
        .y((d) => y(d.y));

      const xAxis = d3.axisBottom(x).ticks(7);
      const yAxis = d3.axisLeft(y).ticks(10);

      // Frame
      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // Axes
      g.append("g").attr("class", "y axis").call(yAxis);
      g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

      g.selectAll(".tick text").attr("font-size", tickLabelSize);

      const checkpoints = g
        .append("g")
        .selectAll("checkpoint")
        .data(tieInPoints)
        .enter();

      checkpoints
        .append("line")
        .attr("x1", (d) => x(d.x))
        .attr("y1", 0)
        .attr("x2", (d) => x(d.x))
        .attr("y2", height)
        .style("stroke", tieInColor)
        .style("fill", "none");

      checkpoints
        .append("text") // inner x-axis label
        .attr("class", "x label")
        .attr("text-anchor", (d) => (d.x < 10000 ? "start" : "end"))
        .attr("x", (d) => x(d.x) + (d.x < 10000 ? 5 : -5))
        .attr("y", (d, i) => (i === 0 ? 15 : height - 6))
        .text((d) => d.name);

      g.append("text") // outer x-axis label
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width / 2)
        .attr("y", height + (2 * margin.bottom) / 3 + 6)
        .text("Distance (m)");

      g.append("text") // plot title
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2 - margin.left)
        .attr("y", -margin.top / 2)
        .attr("dy", "+.75em")
        .text("Bathymetry");

      g.append("text") // time
        .attr("class", "time label")
        .attr("text-anchor", "start")
        .attr("x", 0)
        .attr("y", (-margin.top * 3) / 4)
        .attr("dy", "+.75em")
        .text(`Time: `);

      g.append("text") // outer y-axis label
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", -height / 2)
        .attr("y", -margin.left / 2)
        .attr("dy", "-.75em")
        .attr("transform", "rotate(-90)")
        .text("Elevation (m)");

      // Data
      g.append("path") // plot the data as a line
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#fff")
        .transition()
        // .delay(500)
        .duration(500)
        .style("stroke", "#b71c1c");

      // circles
      if (!period) return;

      function update(data, initial = false) {
        const pig = g.selectAll("circle.pig").data(data, (d) => d.i);

        g.select("text.time").text(`Time: ${round(time, 1)} hours`);

        pig.exit().remove();

        const pigEnter = pig.enter();

        pig
          .attr("cx", (d) => x(d.x))
          .attr("cy", (d) => y(d.y))
          .transition()
          .duration(500);

        pigEnter
          .append("circle")
          .attr("class", "pig")
          .attr("cx", (d) => x(d.x))
          .attr("cy", (d) => y(d.y))
          .attr("r", 5)
          .style("fill", initial ? "#fff" : "#b71c1c")
          // .attr("class", "dot")
          // .merge(pig)
          .transition()
          .duration(500)
          .style("fill", "#b71c1c");
      }

      update(
        getPigPositions({
          period,
          transitTime,
          timeInRun,
          journey,
        }),
        true
      );

      function animate(elapsed) {
        time = elapsed / 1000;
        update(
          getPigPositions({
            period,
            transitTime,
            timeInRun: time,
            journey,
          })
        );
      }

      d3.interval(animate, 100);
    });
  }

  useEffect(init, [period, transitTime, timeInRun, nomax]);

  return (
    <>
      <h2 className="text-xl mt-4">Visualisation</h2>
      <div ref={ref}></div>
    </>
  );
}
