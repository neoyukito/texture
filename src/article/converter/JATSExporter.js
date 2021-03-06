import { validateXMLSchema } from 'substance'
import TextureArticle from '../TextureArticle'
import { internal2jats } from './r2t'

export default class JATSExporter {
  /*
    Takes a InternalArticle document as a DOM and transforms it into a JATS document,
    following TextureArticle guidelines.
  */
  export (doc) {
    let jats = internal2jats(doc)
    let res = validateXMLSchema(TextureArticle, jats)
    if (!res.ok) {
      res.errors.forEach((err) => {
        console.error(err.msg, err.el)
      })
    }
    return {
      jats,
      ok: res.ok,
      errors: res.errors
    }
  }
}
