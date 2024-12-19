const NetflixSeries = () => {

    const image = "https://upload.wikimedia.org/wikipedia/en/7/75/Pushpa_-_The_Rise_%282021_film%29.jpg";
    const id = "pushpa2";
    const name = "Pushpa 2";
    const ratting = "8.9";
    const summary = "Pushpa 2 has unleashed madness at the box office, with the film standing at a massive 605.25 crore in 6 days. It would not be an exaggeration to say the film might enter the 1000 crore club by the beginning of the second weekend. The film is all set to bring magical numbers on weekdays as well.Pushpa 2 Box Office Day 6On the sixth day";
    //const watch_url = "https://youtu.be/1kVK0MZlbI4?si=VMxcC1GikWAvW6Cb";
    let age = 19;
    // Complex If Case
    let canWatch = "Not Available"
    if (age >= 18) canWatch = "Watch Now"
    return (
        <>
            <div>
                <div>
                    <img src={image}
                        alt={id}
                        height="250px"
                        weight="250px" />
                </div>
                <div>
                    <h1><b>Name:</b> {name} </h1>
                    <h2><b>Ratting:</b> {ratting} </h2>
                    <p><b>Summary:</b> {summary} </p>
                    <button> {canWatch} </button>
                </div>
            </div>
        </>
    )
}
export default NetflixSeries