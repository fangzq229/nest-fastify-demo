// 自定义根目录 app.module.ts 自動加载器
import { readdirSync } from 'fs';
import { join, extname } from 'path';
import developmentConfig from './config/dev.config';
import testConfig from './config/test.config';
import productionConfig from './config/prod.config';
import defaultConfig from './config/default.config';

interface LoaderIn {
  path: string;
}

// public auto laoder
export const moduleLoader = (param: LoaderIn) => {
  let res = [];
  try {
    res = readdirSync(param.path);
  } catch (error) {
    return res;
  }
  const models = res
    .filter((i) => {
      return extname(join(param.path, i)) === '.js';
    })
    .map((i) => {
      const M = require(join(param.path, i));
      let Model;
      for (const k in M) {
        if (k && typeof M[k] === 'function') {
          Model = M[k];
          break;
        }
      }
      return Model;
    })
    .filter((i) => i);
  return models;
};

// config loader
export const configLoader = () => {
  const configs = {
    dev: developmentConfig,
    test: testConfig,
    prod: productionConfig,
  };
  const env = process.env.NODE_ENV || 'dev';
  return Object.assign(defaultConfig, configs[env]);
};
