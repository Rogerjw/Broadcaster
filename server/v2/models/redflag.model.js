import pool from '../db/config.db';
import queries from '../db/queries.db'
class Redflag {
    constructor(id, createdOn = '12/12/12', createdBy='13', title, type = 'redflag', location, status = 'draft', images, videos, comment) {
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
    static addRedflag(redflag){
      return pool.query(queries.addRedflag,[redflag.createdOn,redflag.createdBy,redflag.title,redflag.type,
        redflag.location,redflag.status,redflag.images,redflag.videos,redflag.comment]);
    }
    static getAllRedflag(){
      return pool.query(queries.getAllRedflags);
    }
    static findOneRedflag(id){
      return pool.query(queries.findOneRedflag,[id]);
    }
    static deleteOneRedflag(id){
      return pool.query(queries.deleteOneRedflag,[id]);
    }
    static editOneLocation(location,id){
      return pool.query(queries.editOneLocation,[location,id]);
    }
    static editOneComment(comment,id){
      return pool.query(queries.editOneComment,[comment,id]);
    }
  }
  export default Redflag;