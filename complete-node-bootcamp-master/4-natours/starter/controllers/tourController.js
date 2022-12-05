const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
};

const getTourById = (req, res) => {
    const tourId = req.params.id * 1;
    const tour = tours.find(el => el.id === tourId);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            error: {
                status: 'NOT_FOUND',
                description: `Tour id:${tourId} not found.`
            }
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
};

const createTour = (req, res) => {
    console.log(req.body);
    const tourId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: tourId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            })
        }
    );
};

const updateTour = (req, res) => {
    const tourId = req.params.id * 1;

    if (tourId > tours.length) {
        return res.status(404).json({
            status: 'fail',
            error: {
                status: 'NOT_FOUND',
                description: `Tour id:${tourId} not found.`
            }
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

const deleteTour = (req, res) => {
    if (tourId > tours.length) {
        return res.status(404).json({
            status: 'fail',
            error: {
                status: 'NOT_FOUND',
                description: `Tour id:${tourId} not found.`
            }
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
};

module.exports = {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour
}