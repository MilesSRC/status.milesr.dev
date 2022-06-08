import { ReactElement, useState } from "react";
import { IMachine, IService } from "../types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from "@fortawesome/pro-light-svg-icons";

export default function Services({ data, machine }: { data: IService[], machine: IMachine }): ReactElement {
    let [showing, setShowing] = useState(false);

    const serviceElems = data.map(service => (
        <div className="bg-slate-800 px-3 rounded-md p-2">
            <div className="top text-left flex align-middle">
                <div className={(service.online ? 'bg-green-400 animate-pulse' : 'bg-red-600') + " rounded-full inline-block w-3 h-3"}></div>
                <a href={ service.url } className="mx-2 font-bold">{ service.name }</a>
            </div>

            <div className="stats">
                <strong>Description: </strong> { service.description }
                <br />
                <strong>Version</strong>: { service.version }
                <br />
                <strong>RAM</strong>: { (service.process.ram / 1000 / 1000).toFixed(0) }MB
                <br />
                <strong>PID</strong>: { service.process.pid }
            </div>
        </div>
    ));

    function toggleShowing(){
        setShowing(!showing);
    }

    return (
        <div className="services">
            <button className=" flex" onClick={toggleShowing}>
                { showing ? <> <FontAwesomeIcon className="mx-2" size='lg' icon={faCaretUp} /> Hide </> : <> <FontAwesomeIcon className="mx-2" size='lg' icon={faCaretDown} /> Show </> } services
            </button>
            { showing ? serviceElems : null }
        </div>
    )
}