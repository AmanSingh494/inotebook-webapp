const express = require('express')
const router = express.Router()
const fetchUser = require('../middlewares/fetchUser')
const notesCollection = require('../models/Notes')
const { body, validationResult } = require('express-validator')

//  route 1 : get all the notes from the db for a particular user
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await notesCollection.find({ user: req.user.id })
    res.json(notes)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Some internal error occurred')
  }
})
// route 2 : creating notes for a particular user
router.post(
  '/createnote',
  fetchUser,
  [
    body('title', 'Title cannot be empty').notEmpty(),
    body('description', 'description cannot be empty').notEmpty()
  ],
  async (req, res) => {
    const { title, description, tag } = req.body
    console.log(title)
    const result = validationResult(req)
    if (!result.isEmpty()) {
      res.status(400).send({ error: result.array() })
    } else {
      const duplicateCheck =
        (await notesCollection.findOne({ title: title }).count()) > 0
      if (duplicateCheck) {
        res.send({ error: 'Notes cannot have same title' })
      } else {
        try {
          const notes = await notesCollection.create({
            user: req.user.id,
            title,
            description,
            tag
          })
          res.json(notes)
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      }
    }
  }
)

// route 3 : updating a note
router.put('/updatenote/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body
  // create a new note object
  const newNote = {}
  if (title) {
    newNote.title = title
  }
  if (description) {
    newNote.description = description
  }
  if (tag) {
    newNote.tag = tag
  }
  // find the note to be updated and update it
  //  finding a note by the id in the parameters
  if (req.params.id.length !== 24) {
    return res.status(400).send('Please check again')
  }
  let note = await notesCollection.findById(req.params.id)
  if (!note) {
    return res.status(404).send('Not Found')
  }
  console.log(note.user)
  console.log()
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send('Not Allowed')
  }
  note = await notesCollection.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  )
  res.json({ note })
})
// route 4 : deleting a note
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
    // find the note to be deleted
    //  finding a note by the id in the parameters
    if (req.params.id.length !== 24) {
      return res.status(400).send('Please check again')
    }
    let note = await notesCollection.findById(req.params.id)
    if (!note) {
      return res.status(404).send('Not Found')
    }
    //  check if the user with the specified note is the one who has logged in
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed')
    }
    note = await notesCollection.findByIdAndDelete(req.params.id)
    res.send('Note has been deleted successfully')
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Some internal error occurred')
  }
})
module.exports = router
