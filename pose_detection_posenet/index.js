

const width = 640;
const height = 420;
var video, bttn;
var poseNet;
var results, poses = [];
var key = 0;

function setup(){
    const canvas = createCanvas(640,420);
    bttn = document.getElementById("start");
    bttn.onclick = detection;
    video = createCapture(VIDEO);
    video.size = (width,height);
    poseNet = ml5.poseNet(video,() => {
        console.log("Model loaded successfully.")
    });
    video.hide();
}

function detection(){
    if(key == 1){
        key = 0;
        console.log("Detection Stopped.")
        bttn.innerHTML = "start"
    }
    else {
        key = 1;
        console.log("Detection Started.")
        poseNet.on('pose',function(results){
            poses = results;
        });
        bttn.innerHTML = "stop"
    }
}

function draw(){
    image(video,0,0);
    if (key == 1) {
        if(poses.length > 0){
            for(let i = 0; i < poses.length; i++){
                let pose = poses[i].pose;
                for(let p = 0; p< pose.keypoints.length; p++){
                    let points = pose.keypoints[p];
                    fill(255,0,255);
                    noStroke();
                    ellipse(points.position.x,points.position.y,10);
                    }
                }
            }
        }
}
