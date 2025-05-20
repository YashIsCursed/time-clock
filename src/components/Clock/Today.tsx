'use client'
export default function Today({Date}:{Date:Date}){
    return (
        <>
        <div className="flex gap-4">
            <p>{Date.toString().split(" ")[2]}</p>
            <div>
            <p className="text-sm">{Date.toString().split(' ')[1]}</p>
            <p className="text-sm">{Date.toString().split(' ')[0]}</p>
            </div>
            <p>{Date.toString().split(" ")[3]}</p>
        </div>
        <div className="text-lg">
            <p>{Date.toString().split("(")[1].split(")")}</p>
        </div>
        </>
    );
}