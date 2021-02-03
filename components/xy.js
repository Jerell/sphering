import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function XY() {
  const ref = useRef();

  function init() {
    ref.current.innerHTML = "";

    const margin = { top: 50, right: 80, bottom: 80, left: 80 },
      width = ref.current.clientWidth - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const data = [
      { x: 0, y: 0 },
      { x: 1, y: 30 },
      { x: 2, y: 40 },
      { x: 3, y: 20 },
      { x: 4, y: 90 },
      { x: 5, y: 70 },
    ];

    const xVal = (d) => d.x;
    const yVal = (d) => d.y;

    const x = d3.scaleLinear().domain(d3.extent(data, xVal)).range([0, width]);
    const y = d3.scaleLinear().domain(d3.extent(data, yVal)).range([height, 0]);

    const line = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    const xAxis = d3.axisBottom(x).ticks(5);
    const yAxis = d3.axisLeft(y).ticks(4);

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

    // Axis labels
    g.append("text") // inner x-axis label
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 6)
      .attr("y", height - 6)
      .text("inner x-axis label");

    g.append("text") // outer x-axis label
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 2)
      .attr("y", height + (2 * margin.bottom) / 3 + 6)
      .text("outer x axis label");

    g.append("text") // plot title
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("dy", "+.75em")
      .text("plot title");

    g.append("text") // inner y-axis label
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", -6)
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("inner y-axis label");

    g.append("text") // outer y-axis label
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("x", -height / 2)
      .attr("y", -6 - margin.left / 3)
      .attr("dy", "-.75em")
      .attr("transform", "rotate(-90)")
      .text("outer y-axis label");

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
      .style("stroke", "#000");
  }

  useEffect(init, []);

  return (
    <>
      <div ref={ref}></div>
    </>
  );
}
