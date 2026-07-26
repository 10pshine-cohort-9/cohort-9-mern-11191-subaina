class noteRepository {
  constructor(model) {
    this.model = model;
  }


  async create(noteData) {
    return this.model.create(noteData);
  }

  async findAllbyOwner(ownerID) {
    return this.model.find({ owner: ownerID }).sort({ createdAt: -1 });
  }

  async findByIdAndOwner(noteId, ownerId) {
    return this.model.findOne({ _id: noteId, owner: ownerId });
  }

  async updateByIdAndOwner(noteId, ownerId, updateData) {
    return this.model.findOneAndUpdate(
      { _id: noteId, owner: ownerId },
      updateData,
      { new: true, runValidators: true }
    );
  }

  async deleteByIdAndOwner(noteId, ownerId) {
    return this.model.findOneAndDelete({ _id: noteId, owner: ownerId });
  }


}
  module.exports = NoteRepository;
