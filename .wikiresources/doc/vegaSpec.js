var vegaSpec = {
    "width": "container",
    "height": 300,
    "data": {
        "sequence": {
            "start": 0,
            "stop": 12.7,
            "step": 0.1,
            "as": "x"
        }
    },
    "transform": [
        {
            "calculate": "sin(datum.x)",
            "as": "sin(x)"
        }
    ],
    "mark": "line",
    "encoding": {
        "x": {
            "field": "x",
            "type": "quantitative"
        },
        "y": {
            "field": "sin(x)",
            "type": "quantitative"
        }
    }
};	