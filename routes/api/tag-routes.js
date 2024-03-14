const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product,
      as: "products" }]
    });
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one tag
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: { model: Product, 
      as: "products" }
    });
    if (!singleTag) {
      res.status(404).json({ message: "no tag found with provided id" });
      return;
    }
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name,
    },
      {
        where: {
          id: req.params.id,
        }
      });

    if (!updatedTag) {
      res.status(400).json({ message: "No tag found with provided id" });
      return;
    }
    res.status(200).json(updatedTag)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!deletedTag) {
      res.status(400).json({ message: "no tag found with provided id" });
      return;
    }

    res.status(200).json(deletedTag);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
