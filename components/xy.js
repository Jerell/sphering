import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { round } from "../public/utils";

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
  { x: 0, name: "Southwark Hub Platform", journeyFraction: 0 },
  { x: 5655, name: "Southwark Hub Tie-in", journeyFraction: 0.15 },
  { x: 37255, name: "Blythe Hub Tie-in", journeyFraction: 0.75 },
  { x: 66279, name: "Bacton", journeyFraction: 1 },
];

function getPigPositions({ period, transitTime, timeInRun, journey }) {
  console.log(arguments[0]);

  const pigs = [];
  function addPig({ x, y }) {
    pigs.push({ x, y });
  }
  function removePig() {
    pigs.shift();
  }

  const firstEntry = 2 * period + 1;
  const numPigs =
    (timeInRun >= firstEntry) + Math.floor((timeInRun - firstEntry) / period);
  if (!numPigs) return pigs;

  for (let i = 0; i < numPigs; i++) {
    // console.group(`Pig ${i}`);

    const travelTime = timeInRun - i * period - firstEntry;
    const journeyFraction = travelTime / transitTime;
    if (journeyFraction > 1) continue; // skip if past end

    // console.log({ travelTime, journeyFraction });

    // let nextCheckpointIdx = tieInPoints.findIndex(
    //   (tp) => tp.journeyFraction >= journeyFraction
    // );

    const jf = round(journeyFraction, 4);
    const coordIdx = journey.findIndex((row) => parseFloat(row[0]) > jf) - 1;
    const coordRow = journey[coordIdx];
    console.log({ coordIdx }, journey[coordIdx]);

    // console.log(nextCheckpointIdx, tieInPoints[nextCheckpointIdx]);
    addPig({ x: parseFloat(coordRow[1]), y: parseFloat(coordRow[2]) });
    console.groupEnd();
  }
  console.log({ pigs });
  return pigs;
}

export default function XY({ period, transitTime, timeInRun, journey }) {
  const ref = useRef();

  const pigLocations = getPigPositions({
    period,
    transitTime,
    timeInRun,
    journey,
  });

  function init() {
    ref.current.innerHTML = "";

    const margin = { top: 50, right: 80, bottom: 80, left: 55 },
      width = ref.current.clientWidth - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom,
      tieInColor = "#ccc";

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    d3.csv("xy.csv").then((data) => {
      const xVal = (d) => parseFloat(d.x);
      const yVal = (d) => parseFloat(d.y);

      const x = d3
        .scaleLinear()
        .domain(d3.extent(data, xVal))
        .range([0, width]);
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
        .attr("y", (d, i) => (i % 2 ? 10 : height - 6))
        .text((d) => d.name);

      // Axis labels
      // // end
      // g.append("text") // inner x-axis label
      //   .attr("class", "x label")
      //   .attr("text-anchor", "end")
      //   .attr("x", width - 6)
      //   .attr("y", height - 6)
      //   .text("bacton");
      // // start
      // g.append("text") // inner x-axis label
      //   .attr("class", "x label")
      //   .attr("text-anchor", "end")
      //   .attr("x", 90)
      //   .attr("y", height - 6)
      //   .text("southwark");

      g.append("text") // outer x-axis label
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width / 2)
        .attr("y", height + (2 * margin.bottom) / 3 + 6)
        .text("Distance (m)");

      g.append("text") // plot title
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("dy", "+.75em")
        .text("Bathymetry");

      // g.append("text") // inner y-axis label
      //   .attr("class", "y label")
      //   .attr("text-anchor", "end")
      //   .attr("x", -6)
      //   .attr("y", 6)
      //   .attr("dy", ".75em")
      //   .attr("transform", "rotate(-90)")
      //   .text("inner y-axis label");

      g.append("text") // outer y-axis label
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", -height / 2)
        .attr("y", -6 - margin.left / 3)
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
        .delay(500)
        .duration(1000)
        .style("stroke", "#b71c1c");

      // circles
      // const randomPoints = getRandom(data, 4);
      // console.log(randomPoints);
      g.append("g")
        .selectAll("dot")
        .data(pigLocations)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("r", 5)
        .style("fill", "#fff")
        .transition()
        .delay(500)
        .duration(1000)
        .style("fill", "#b71c1c");
    });
  }

  useEffect(init, [period, transitTime, timeInRun]);

  return (
    <>
      <h2 className="text-xl mt-4">Visualisation</h2>
      <div ref={ref}></div>
    </>
  );
}
