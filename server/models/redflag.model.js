class Redflag {
    constructor(id, createdOn, createdBy, title, type, location, status = 'draft', images, videos, comment) {
      this.id = id;
      this.createdOn = createdOn;
      this.createdBy = createdBy;
      this.title = title;
      this.type = type;
      this.location = location;
      this.status = status;
      this.images = images;
      this.videos = videos;
      this.comment = comment;
    }
  }
  export default Redflag;