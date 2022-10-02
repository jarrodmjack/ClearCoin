
const TripleSection = ({ trending }) => {

    console.log(trending[0])
    console.log(trending[1])
    console.log(trending[2])

    return (
        <div className="card w-96 bg-base-300 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
    )
}

export default TripleSection