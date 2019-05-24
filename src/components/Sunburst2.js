import React , {useState , useEffect} from 'react';
import * as d3 from 'd3';
import Complete from './Complete.js'


const Sunburst2 = () => {

    const [selectedSubject , changeSubject] = useState('');

    useEffect(() => {
        const fetchData = async() => {    
            const res = await fetch('http://localhost:5000/all');
            const {data} = await res.json();
            renderGraph(data[0]);        
        }
        fetchData();
    }, [])

    const renderGraph = (data) => {        
        const size = 200;
        const radius = size / 2;
        const format = d3.format(",d")
        const arc = (o) => {
            return d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(o ? 100 : 150)
            .outerRadius(o ? 150 : 200)
        };
        const autosize = svg => {
            document.querySelector('.sunburst').appendChild(svg);
            const box = svg.getBBox();
            // document.body.removeChild(svg);
            svg.setAttribute("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
            return svg;
        }
        const partition = (() => data => d3.partition()
            .size([2 * Math.PI, radius])
            (d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value)))();

        const root = partition(data);
                  
        const svg = d3.select('.sunburst').append('svg')
                      .style("width", 600)
                      .style("height", 600)
                      .style("font", "8px sans-serif")
                      .style('transform', 'translate(25px, 25px)')
                      .style('background', 'rgba(0, 0, 0, 0.1)');

        
        const svgPath = (o) => {
            console.log('DESC' , root.descendants()[0].data);
            svg.append("g")
               .attr("fill-opacity", .5)
               .selectAll("path")
               .data(root.descendants()[0].data.filter(d => d.depth))
               .enter().append("path")
               .attr('stroke' , 'lightcoral')
               .attr('stroke-width', '0.5px')
               .attr('fill', 'grey' )
               .attr('d', arc(o))
               .append("title")
               .text(d => `${d.ancestors().map(d => console.log('DDD' , d)).reverse().join("/")}\n${format(d.value)}`)
               .on('mouseover', function (d, i, nodes) {
                   d3.select(nodes[i])
                   .attr('fill', 'blue')
               })
               .on('mouseout', function (d, i, nodes) {
                   d3.select(nodes[i])
                   .attr('fill', 'grey')
               });
            svg.append("g")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .selectAll("text")
                .data(root.descendants())
                .enter().append("text")
                .attr("dy", "0.35em")
                .text(d => d.subject)
                .attr("transform", function(d) {
                    if(d.subject === 'Hello World'){
                        return
                    }
                    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                    const y = o ? (100 + 150) / 2 : (150 + 200) / 2;
                    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
                });
        }
        svgPath()
        selectedSubject && svgPath(true)

        return autosize(svg.node());
    }
    

    return(
        <div>
            <h1>Graph</h1>
            <div className="sunburst"></div>
            <Complete/>
        </div>
    )
}

export default Sunburst2;

