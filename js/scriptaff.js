function showVal(val){
    document.getElementById("demo").innerHTML = val;

}

var aff = document.getElementById("affaffslider").defaultValue;
var eff = document.getElementById("effaffslider").defaultValue;
var den = document.getElementById("denaffslider").defaultValue;
var effic = document.getElementById("efficiaffslider").defaultValue;
var agoaff = document.getElementById("agoaffaffslider").defaultValue;

/*
var trace = {
    x: [-10,-9,-8],
    y: [10,20,30],
    
};

//var data = [trace];
var sliderSteps = [];
for(i = -0.3;i<0.7;i+=0.01){
    sliderSteps.push({
        method:'animate',
        label: i,
              
        args: [[i],{
            
            mode:'immediate',
            transition:{duration: 100},
            frame: {duration: 100, redraw: false},
        }]
    });
    
    
}*/

function updateAffinityCom(value){
    //newData = [];
    aff = value;
    //console.log(aff)
    lineData = calcLinesCom(aff,eff,den,effic,agoaff);
    /*var graph = {
        y: lineData[1],
        traces:[0]
    }
    console.log(lineData)
    newData.push(graph);*/
    var animation = {
        transition: {
            duration: 100,
            easing: "cubic-in-out"
        }
    }
    //I'm doing something wrong if I try just place lineData into newData, below works though
    Plotly.animate("competitive",{data: [{y: lineData[1]}], traces: [0], layout: {}},animation)

} 

function updateEfficacyCom(value){
    eff = value;
    lineData = calcLinesCom(aff,eff,den,effic,agoaff);
    var animation = {
        transition: {
            duration: 100,
            easing: "cubic-in-out"
        }
    }
    //I'm doing something wrong if I try just place lineData into newData, below works though
    Plotly.animate("competitive",{data: [{y: lineData[1]}], traces: [0], layout: {}},animation)

} 

function updateDensityCom(value){
    den = value;
    lineData = calcLinesCom(aff,eff,den,effic,agoaff);
    var animation = {
        transition: {
            duration: 100,
            easing: "cubic-in-out"
        }
    }
    //I'm doing something wrong if I try just place lineData into newData, below works though
    Plotly.animate("competitive",{data: [{y: lineData[1]}], traces: [0], layout: {}},animation)
} 

function updateEfficiencyCom(value){
    effic = value;
    lineData = calcLinesCom(aff,eff,den,effic,agoaff);
    var animation = {
        transition: {
            duration: 100,
            easing: "cubic-in-out"
        }
    }
    //I'm doing something wrong if I try just place lineData into newData, below works though
    Plotly.animate("competitive",{data: [{y: lineData[1]}], traces: [0], layout: {}},animation)

} 

function updateAgoAffinityCom(value){
    agoaff = value;
    lineData = calcLinesCom(aff,eff,den,effic,agoaff);
    var animation = {
        transition: {
            duration: 100,
            easing: "cubic-in-out"
        }
    }
    //I'm doing something wrong if I try just place lineData into newData, below works though
    Plotly.animate("competitive",{data: [{y: lineData[1]}], traces: [0], layout: {}},animation)

}

function calcLinesCom(affinity, efficacy, recepDensity, efficiency,agoaffinity){
    //console.log("calclines ran")
    //console.log(affinity, efficacy, recepDensity, efficiency)
    const STEP = 0.05;
    var data = [[],[]];
    //Inverse log input values

    var affin = 10**affinity;
    var efcay = 10**efficacy;
    var recep = 10**recepDensity;
    var efcey = 10**efficiency;
    var agoaffin = 10**agoaffinity;
    for (i=-12; i<-2;i=i+STEP){
        effect = (10**i*efcay*recep*efcey*100)/(10**i*(efcay*recep*efcey+1)+affin*(1+10**(-9)/agoaffin));
        data[0].push(i);
        data[1].push(effect);
    }
    return data;
}

function plotGraph(chart){

    var layout = {
        xaxis:{
            title: "[Agonist] (log M)",
            showline: true,
            range: [-12,-2],
            
        },
        yaxis:{
            title: "Effect (% Emax)",
            showline: true,
            range: [0,100],
            tickvals: [0,20,40,60,80,100]

        },
        /*sliders: [
            {
                label: 'Slider 1',
                pad: {t: 30},
                active: 50,
                font:{color: 'transparent'}, 
                tickcolor: 'transparent',
                steps: sliderSteps
            },
            {
                label: 'Slider 2',
                pad: {t: 30},
                active: 50,
                font:{color: 'transparent'}, 
                tickcolor: 'transparent',
                steps: sliderSteps
            }
        ]*/
    }
    var data = []
    var lineData = calcLinesCom(aff, eff, den, effic, agoaff)
    console.log(lineData)
    var graph = {
        x: lineData[0],
        y: lineData[1],
        mode: "lines",
        line: {
            width: 1
        }
    }
    data.push(graph);

    Plotly.plot(chart,data,layout);
}
plotGraph("alloaffin");




/*
Plotly.plot('graph', [{
    x: [-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2],
    y: [0,]
  }], {
      sliders: [
        {
          label: 'SLider 1',
          pad: {t: 30},
          currentvalue: {
            xanchor: 'right',
            prefix: 'color: ',
            font: {color: '#888', size: 20}
          },
        steps: [{
          label: 'red',
          method: 'restyle',
          args: ['line.color', 'red']
        }, {
          label: 'green',
          method: 'restyle',
          args: ['line.color', 'green']
        }, {
          label: 'blue',
          method: 'restyle',
          args: ['line.color', 'blue']
        }]
      },
      {
        label: 'Slider 2',
        pad: {t: 30},
      }
      ]
    }); */