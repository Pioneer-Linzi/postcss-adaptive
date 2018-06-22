import postcss from 'postcss'
import pkg from '../package.json'
import Adaptive from './adaptive'

export default postcss.plugin(pkg.name, (options) => {
  return (css, result) => {
    if (options && options.exclude && css.source.input.file.match(options.exclude) !== null) {
      result.root = css
      return
    }
    const adaptiveIns = new Adaptive(options)
    const output = adaptiveIns.parse(css.toString())
    result.root = postcss.parse(output)
  }
})
