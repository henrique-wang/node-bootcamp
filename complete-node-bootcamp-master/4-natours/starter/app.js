const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// SERVICES
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

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
}

const createTour = (req, res) => {
    console.log(req.body);
    const tourId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: tourId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
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
}

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
}

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
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'Route not implemented yet.'
    });
}

const getUserById = (req, res) => {
    res.status(500).json({
        status: 'Route not implemented yet.'
    });
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'Route not implemented yet.'
    });
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'Route not implemented yet.'
    });
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'Route not implemented yet.'
    });
}

// ROUTES
const tourRouter = express.Router();
tourRouter.route('/')
    .get(getAllTours)
    .post(createTour);
tourRouter.route('/:id')
    .get(getTourById)
    .patch(updateTour)
    .delete(deleteTour);

app.use('/api/v1/tours', tourRouter);

const userRouter = express.Router();
app.use('/api/v1/users', userRouter);

userRouter.route('/')
    .get(getAllUsers)
    .post(createUser);
userRouter.route('/:id')
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})