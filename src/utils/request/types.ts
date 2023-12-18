export interface RequestOptions {
  // 默认将prefix 添加到url
  joinPrefix?: boolean;
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  isReturnNativeResponse?: boolean;
  // 需要对返回数据进行处理
  isTransformResponse?: boolean;
  // post请求的时候添加参数到url
  joinParamsToUrl?: boolean;
  // 格式化提交参数时间
  formatDate?: boolean;
  // 请求拼接路径
  urlPrefix?: string;
  // 带上token
  withToken?: boolean;
  // 是否加入时间戳
  joinTime?: boolean;
}

// 请求响应参数（不包含data）
export interface BasicResult {
  statusCode: number;
  message: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends BasicResult {
  data: T;
}

// 分页请求参数
export interface ReqPage {
  page: number;
  pageSize: number;
}

// 分页响应参数
export interface ResPage<T = any> extends BasicResult {
  rows: T[];
  currentPage: number;
  total: number;
  totalPage: number;
}

export type Result<T = any> = BasicResult | ResultData<T> | ResPage<T>;
