import { P5CanvasInstance } from "@p5-wrapper/react";
import { Socket } from "socket.io-client";
import Paddel from "./Player";
import Net from "./Net";
import Ball from "./Ball";
import { BallCoordinates, GameProps, User } from "./gameInterfaces";



export default function sketch(p5: P5CanvasInstance) {
    let player1: Paddel;
    let player2: Paddel;
    let net    : Net;
    let ball   : Ball;
    let socket : Socket;
    let user: User;
    let opponentPos: number;
    let gameId: string;
    let pos: number;
    let ballCoordinates: BallCoordinates = {
      x: 50,
      y: 50
    };
  
    p5.setup = () => {
      if(p5.windowWidth > 1500)
      {
        p5.createCanvas(1300, 700);
      }else if(p5.windowWidth <= 350 ) {
          p5.createCanvas(300, 150);
      }
      else {
        p5.createCanvas(p5.windowWidth - (p5.windowWidth / 6), p5.windowWidth / 1.99);
      }
      net     = new Net(p5);
      ball    = new Ball(p5);
      player1 = new Paddel(p5, true);
      player2 = new Paddel(p5, false);
    }
    
    p5.draw = () => {
      socket?.emit("getBallAndP2Positions", {id: gameId, user: user});
      p5.background(0);
      net.drow(p5);
      ball.drow(p5, ballCoordinates.x, ballCoordinates.y);
      player1.drow(p5, 0);
      player2.drow(p5, opponentPos);
      let next = player1.update(p5);
      if(next != undefined && next != pos){
        socket?.emit("setPositon", {id: gameId, user: user, pos: (next * 100 / p5.height)});
      }
      pos = next;
    };

    p5.windowResized = () => {
      if(p5.windowWidth < 1500 && p5.windowWidth > 350)
      {
        p5.resizeCanvas(p5.windowWidth - (p5.windowWidth / 6), p5.windowWidth / 1.99);
      } else if(p5.windowWidth <= 350 ) {
        p5.createCanvas(300, 150);
      }
      player1.resize(p5, true);
      player2.resize(p5, false);
      net.resize(p5);
      ball.resize(p5);
    }

    p5.updateWithProps = (props: GameProps) => {
        socket = props.socket;
        user = props.user;
        gameId = props.gameId;
        if(props.opponentPos){
          opponentPos = (props.opponentPos * p5.height / 100);
        }
        if(props.ballCoordinates) {
          ballCoordinates = props.ballCoordinates;
        }
    };
}