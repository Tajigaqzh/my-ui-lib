import { ExtractPropTypes } from "vue"
import { IfNever, UnknownToNever, WritableArray } from "./utils"


type Value<T> = T[keyof T]


export type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{
    key: T
  }>
>


export type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{
    type: WritableArray<T>
    required: true
  }>
>


/**
 * Handling default values for input (constraints)
 *
 * 处理输入参数的默认值（约束）
 */
export type EpPropInputDefault<
  Required extends boolean,
  Default,
> = Required extends true
  ? never
  : Default extends Record<string, unknown> | Array<any>
    ? () => Default
    : (() => Default) | Default
    
export type EpPropMergeType<Type, Value, Validator> =
  | IfNever<UnknownToNever<Value>, ResolvePropType<Type>, never>
  | UnknownToNever<Value>
  | UnknownToNever<Validator>
  
export type EpPropInput<
  Type,
  Value,
  Validator,
  Default extends EpPropMergeType<Type, Value, Validator>,
  Required extends boolean,
> = {
  type?: Type
  required?: Required
  values?: readonly Value[]
  validator?: ((val: any) => val is Validator) | ((val: any) => boolean)
  default?: EpPropInputDefault<Required, Default>
}
