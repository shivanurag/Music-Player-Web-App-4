idea_1="";
idea_10="";
LeftWristX=0;
LeftWristY=0;
RightWristX=0;
RightWristY=0;
LeftWrist_Score=0;
RightWrist_Score=0;
idea_1_Status=0;
idea_10_Status=0;

function preload()
{ 
    idea_1=loadSound("Idea_1.mp3");
    idea_10=loadSound("Idea_10.mp3");
}

function setup()
{
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on(video,gotPoses);
}

function modelLoaded()
{
    console.log("Posenet is initialised");
}

function gotPoses(results)
{
   if(results.length>0)
   {
    console.log(results);
   
   LeftWristX=results[0].pose.leftWrist.x;
   LeftWristY=results[0].pose.leftWrist.y;
   console.log("Left Wrist X = "+LeftWristX+"Left Wrist Y "+LeftWristY);
   RightWristX=results[0].pose.rightWrist.x;
   RightWristY=results[0].pose.rightWrist.y;
   console.log("Right Wrist X = "+RightWristX+"Right Wrist Y "+RightWristY);
   LeftWrist_Score=results[0].pose.keypoints[9].score;
   RightWrist_Score=results[0].pose.keypoints[10].score;
    }
}

function draw()
{
    image(video,0,0,500);
    fill("#eb4f34");
    stroke("#ed1909");
    idea_1_Status=idea_1.isPlaying();
    idea_10_Status=idea_10.isPlaying();
    if(LeftWrist_Score>0.2)
    {
       circle(LeftWristX,LeftWristY,20);
       idea_10.stop();
        if(idea_1_Status=false)
        {
            idea_1.play();
            document.getElementById("header").innerHTML="Playing "+idea_1;
        }
    }
    if(RightWrist_Score>0.2)
    {
        circle(RightWristX,RightWristY,20);
        idea_10.stop();
        if(idea_10_Status=false)
        {
            idea_10.play();
            document.getElementById("header").innerHTML="Playing"+idea_1;
        }
    }
}