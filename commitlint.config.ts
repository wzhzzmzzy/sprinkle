import type {UserConfig} from '@commitlint/types'

const CommitlintConfig : UserConfig = {
  extends: ['@commitlint/config-conventional']
}

module.exports = CommitlintConfig