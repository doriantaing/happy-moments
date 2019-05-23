import React , {Component} from 'react';
import * as d3 from 'd3';
import {merged , subjects} from '../helpers/dataFile';

class Sunburst extends Component {
    state = {
        svoData: null,
        isLoading: true,
    };

    async componentDidMount() {
        const res = await fetch('http://localhost:5000/all');
        const {data} = await res.json();
        this.setState({
            svoData: data,
            isLoading: false
        });
        this.renderData(subjects);
        this.renderData(subjects);
    }

    async renderData(getData , ...args){
        // CONSTANT
        const data = await getData(...args)
        const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
        const format = d3.format(",d")
        const width = 200
        const radius = width / 2
        function autosize(svg) {
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
                .sort((a, b) => b.value - a.value)))()

        const arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(radius / 2)
            .innerRadius(d => d.y0)
            .outerRadius(d => d.y1 - 1)

        const root = partition(data);

        const svg = d3.select('.sunburst').append('svg')
            .style("width", 400)
            .style("height", 400)
            // .style("padding", "10px")
            .style("font", "8px sans-serif")
            // .style("box-sizing", "border-box");
        svg.append("g")
            .attr("fill-opacity", .5)
            .selectAll("path")
            .data(root.descendants().filter(d => d.depth))
            .enter().append("path")
            .attr('stroke' , 'lightcoral')
            .attr('stroke-width', '0.5px')
            .attr('fill', d => d.data.name === 'i' ? 'red' : 'grey' )
            // .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
            .attr("d", arc)
            .append("title")
            .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

        svg.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(root.descendants())
            .enter().append("text")
            .attr("transform", function(d) {
                if(d.data.name === 'Hello World'){
                    return
                }
                const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                const y = d.depth < 3 ? (d.y0 + d.y1) / 2 : d.y1 + 1;
                return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
            })
            .attr("dy", "0.35em")
            .text(d => d.data.name);

        return autosize(svg.node());
    };

    render(){
        return(
            <div>
                {this.state.isLoading &&
                <h3>Loading ...</h3>
                }
                <div className="sunburst"></div>
            </div>
        )
    }
}

export default Sunburst;