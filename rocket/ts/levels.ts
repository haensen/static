export default [
    {
        start: { x: 0.8, y: 0.4 },
        waypoints: [
            { x: 0.6, y: 0.2 },
        ],
        end: { x: 0.1, y: 0.6 },
        planets: [
            { x: 0.5, y: 0.5, weight: 2.0, image: 'planet1', radius: 30 },
        ],
        texts: [
            { text: 'Use left and right arrow keys to control', x: 0.6, y: 0.7 },
            { text: 'Collect this banana!', x: 0.6, y: 0.15 },
            { text: 'Finish the level here!', x: 0.16, y: 0.55 },
        ]
    },
    {
        start: { x: 0.1, y: 0.1 },
        waypoints: [
            { x: 0.6, y: 0.5 },
        ],
        end: { x: 0.1, y: 0.6 },
        planets: [
            { x: 0.5, y: 0.5, weight: 10.0, image: 'planet2', radius: 40 },
        ],
        texts: []
    },
    {
        start: { x: 0.1, y: 0.6 },
        waypoints: [],
        end: { x: 0.81, y: 0.2 },
        planets: [
            { x: 0.2, y: 0.2, weight: 5.0, image: 'planet3', radius: 60 },
            { x: 0.2, y: 0.8, weight: 5.0, image: 'planet5', radius: 60 },
            { x: 0.5, y: 0.2, weight: 5.0, image: 'planet6', radius: 60 },
            { x: 0.5, y: 0.8, weight: 5.0, image: 'planet7', radius: 60 },
            { x: 0.7, y: 0.2, weight: 5.0, image: 'planet8', radius: 60 },
            { x: 0.8, y: 0.8, weight: 5.0, image: 'planet9', radius: 60 },
        ],
        texts: []
    },
    {
        start: { x: 0.5, y: 0.9 },
        waypoints: [
            { x: 0.1, y: 0.1 },
        ],
        end: { x: 0.9, y: 0.1 },
        planets: [
            { x: 0.5, y: 0.2, weight: 5.0, image: 'planet3', radius: 80 },
            { x: 0.2, y: 0.8, weight: 5.0, image: 'planet5', radius: 80 },
            { x: 0.8, y: 0.8, weight: 5.0, image: 'planet6', radius: 80 },
        ],
        texts: []
    },
    {
        start: { x: 0.8, y: 0.2 },
        waypoints: [
            { x: 0.1, y: 0.9 },
            { x: 0.9, y: 0.9 },
        ],
        end: { x: 0.2, y: 0.1 },
        planets: [
            { x: 0.2, y: 0.5, weight: 15.0, image: 'planet5', radius: 80 },
            { x: 0.8, y: 0.5, weight: 2.0, image: 'planet6', radius: 40 },
        ],
        texts: []
    },
    {
        start: { x: 0.5, y: 0.5 },
        waypoints: [
            { x: 0.1, y: 0.1 },
            { x: 0.9, y: 0.9 },
            { x: 0.1, y: 0.9 },
            { x: 0.9, y: 0.1 },
        ],
        end: { x: 0.5, y: 0.5 },
        planets: [
            { x: 0.2, y: 0.5, weight: 1.0, image: 'planet5', radius: 40 },
            { x: 0.6, y: 0.4, weight: 1.0, image: 'planet6', radius: 40 },
            { x: 0.7, y: 0.8, weight: 1.0, image: 'planet7', radius: 40 },
            { x: 0.4, y: 0.65, weight: 1.0, image: 'planet8', radius: 40 },
            { x: 0.6, y: 0.85, weight: 1.0, image: 'planet9', radius: 40 },
            { x: 0.8, y: 0.85, weight: 1.0, image: 'planet10', radius: 40 },
            { x: 0.9, y: 0.255, weight: 1.0, image: 'planet11', radius: 40 },
            { x: 0.21, y: 0.85, weight: 1.0, image: 'planet12', radius: 40 },
            { x: 0.35, y: 0.565, weight: 1.0, image: 'planet13', radius: 40 },
        ],
        texts: []
    },
];
