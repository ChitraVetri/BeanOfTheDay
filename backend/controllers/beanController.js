import * as model from '../models/beanModel.js';

export const getBeans = async (req, res) => {
    try {
        const beans = await model.getAllBeans();
        res.json(beans);
    } catch (err) {
        res.status(500).json(err.message)
    }
};

export const getBean = async (req, res) => {
    try {
        const bean = await model.getBeanById(req.params.id);
        res.json(bean);
    } catch (err) {
        res.status(500).json(err.message)
    }
};

export const addBean = async (req, res) => {
    try {
        const bean = await model.createBean(req.body);
        res.status(201).json(bean);
    } catch (err) {
        res.status(500).json(err.message)
    }
};

export const modifyBean = async (req, res) => {
    try {
        const updated = await model.updateBean(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json(err.message)
    }
};

export const removeBean = async (req, res) => {
    try {
        await model.deleteBean(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json(err.message)
    }
};
