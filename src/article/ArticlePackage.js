import { ToggleTool } from 'substance'
import BasePackage from '../shared/BasePackage'
import ModelPackage from './ArticleModelPackage'
import EditorPackage from '../editor/EditorPackage'
import MetadataPackage from './metadata/MetadataPackage'
import PreviewPackage from '../reader/ReaderPackage'
import ArticlePanel from './ArticlePanel'
import ArticleConfigurator from './ArticleConfigurator'
import ManuscriptEditor from '../editor/components/ManuscriptEditor'
import MetadataEditor from '../entities/MetadataEditor'
import SwitchViewCommand from './SwitchViewCommand'

export default {
  name: 'Article',
  configure (parentConfig) {
    parentConfig.addComponent('article', ArticlePanel)
    // create a configuration scope
    let config = parentConfig.createScope('article')

    // used during import
    let modelConfig = new ArticleConfigurator().import(ModelPackage)
    config.setConfiguration('model', modelConfig)
    // used for the manuscript editor view
    let manuscriptEditorConfig = ArticleConfigurator.createFrom(modelConfig).import(EditorPackage)
    config.setConfiguration('manuscript', manuscriptEditorConfig)
    // used for the metadata editor view
    let metadataEditorConfig = ArticleConfigurator.createFrom(modelConfig).import(MetadataPackage)
    config.setConfiguration('metadata', metadataEditorConfig)
    // used for preview
    let previewConfig = ArticleConfigurator.createFrom(modelConfig).import(PreviewPackage)
    config.setConfiguration('preview', previewConfig)

    config.import(BasePackage)
    // UI stuff for the ArticlePanel
    config.addComponent('manuscript-editor', ManuscriptEditor)
    config.addComponent('metadata-editor', MetadataEditor)

    config.addToolPanel('nav-bar', [
      {
        name: 'views',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        items: [
          { type: 'command-group', name: 'switch-view' }
        ]
      }
    ])

    config.addCommand('open-manuscript', SwitchViewCommand, {
      view: 'manuscript',
      commandGroup: 'switch-view'
    })
    config.addCommand('open-metadata', SwitchViewCommand, {
      view: 'metadata',
      commandGroup: 'switch-view'
    })

    config.addTool('open-manuscript', ToggleTool)
    config.addLabel('open-manuscript', 'Open Manuscript')
    config.addIcon('open-manuscript', { 'fontawesome': 'fa-align-left' })

    config.addTool('open-metadata', ToggleTool)
    config.addLabel('open-metadata', 'Open Metadata')
    config.addIcon('open-metadata', { 'fontawesome': 'fa-th-list' })
  }
}
