const config = require('../config.json')

function extractTemplates() {
  let templates = config.templates

  if (!Array.isArray(templates)) {
    templates = []
  }

  const templatesObj = {}

  templates = templates
    .map(t => {
      if (!Array.isArray(t.templates)) {
        t.templates = [t.templates]
      }

      return (
        t.templates &&
        t.templates.map(template => {
          const templateURL = `${t.rootURL}/${template}`
          templatesObj[templateURL] = t.options || {}
          return templateURL
        })
      )
    })
    .reduce((accu, subArr) => accu.concat(subArr), [])

  return { templates, templatesObj }
}

module.exports = extractTemplates()
