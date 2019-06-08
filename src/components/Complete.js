import React, { Component } from 'react';

class Complete extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          subject: "",
          verb: "",
          object: "",
          sentences: [],
          error: false
        }
    }

    async getDatas(event){
        event.preventDefault();
        if(this.state.object !== "" && this.state.verb !== "" && this.state.object !== ""){
            console.log(this.state)
            const res = await fetch(`http://localhost:5000/?subject=${this.state.subject}&verb=${this.state.verb}&object=${this.state.object}`)
            const data = await res.json();
            if(data.length === 0){
                this.setState({error: true})
            } else {
                this.setState({error: false})
                console.log(data)
                this.setState({
                    sentences: data[0].array_agg
                })
            } 
        }

    }

    subjectChange(event) {
        this.setState({subject: event.target.value});
    }
    objectChange(event) {
        this.setState({object: event.target.value});
    }
    verbChange(event) {
        this.setState({verb: event.target.value});
    }

    render() {
        const error = this.state.error;
      
      return (
        <div className="complete">

            <form onSubmit={this.getDatas.bind(this)}>
                <input type="text" placeholder="sujet" onChange={this.subjectChange.bind(this)} />
                <input type="text" placeholder="verb" onChange={this.verbChange.bind(this)} />
                <input type="text" placeholder="objet" onChange={this.objectChange.bind(this)} />
                <input type="submit" value="Submit" />
            </form>
            
            {error ? (

                <div>Il n'y a aucun élément</div>

            ) : (

                <ul className="list">
                    {this.state.sentences.map((value, index) => {
                        return <li key={index}>{value}</li>
                    })}
                </ul>
                
            )}

        </div>
      );
    }


  }
export default Complete;
