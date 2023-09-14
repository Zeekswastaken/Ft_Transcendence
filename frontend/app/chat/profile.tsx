import reaact, { MouseEvent, MouseEventHandler } from "react"
import { useMyStore } from "./state";


const profile = ({friend}:any) =>
{
  const {setMyBoolean , setUserData} = useMyStore();
  const setMyStore = (e: MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    setMyBoolean(true);
    setUserData(friend);
  }
    return (
        <li className=" items-center space-y-1">
          <button onClick={setMyStore}>

        <div className=' relative bg-[#321B38] p-1 rounded-full'>

        <a className="block  w-16 h-16  rounded-full " href="#">
          <img className="h-16 w-16 rounded-full" src={friend.user.avatar_url} alt="test" />
        </a>
        <div className={`absolute bottom-0 right-0 rounded-full ${friend.user.status === "Online" ? "bg-green-500" : "bg-gray-500"} border-2 border-white w-[20px] h-[20px]`}></div>
        </div>
        {/* <a href={props.href}>{props.name}</a> */}
          </button>
      </li>
    );
}

export default profile