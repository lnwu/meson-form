import React, { FC, useState } from "react";
import { css, cx } from "emotion";
import { MesonFormHandler, MesonFormForwarded } from "../../src/form-forwarded";
import { IMesonFieldItem, EMesonFieldType } from "../../src/model/types";
import { row, column } from "@jimengio/shared-utils";
import DataPreview from "kits/data-preview";
import Button from "antd/lib/button";
import { DocDemo, DocBlock } from "@jimengio/doc-frame";
import { getLink } from "util/link";

let formItems: IMesonFieldItem<{ name?: string }>[] = [
  {
    type: EMesonFieldType.Input,
    name: "name",
    label: "名字",
  },
];

let FormBasic: FC<{}> = (props) => {
  let [form, setForm] = useState({});
  const formRef = React.useRef<MesonFormHandler>(null);

  return (
    <div className={cx(column, styleContainer)}>
      <DocBlock>{`Ref forwarding 的写法是为了解决自定义 Footer 的问题. 但是传递 Ref 的代码结构不那么清晰, 现在推荐用 [useMesonItems API](#/use-items) 来实现.`}</DocBlock>
      <DocDemo title="Pass control to forward to another component" link={getLink("forward-form.tsx")}>
        <MesonFormForwarded<{ name?: string }>
          formRef={formRef}
          initialValue={form}
          items={formItems}
          hideFooter
          onSubmit={(form) => {
            setForm(form);
          }}
          onReset={() => {
            setForm({});
          }}
        />
        <div>
          <DataPreview data={form} />
          <div className={styleActions}>
            <Button
              type="primary"
              onClick={() => {
                formRef.current.onSubmit();
              }}
            >
              提交
            </Button>
            <Button
              type="ghost"
              onClick={() => {
                formRef.current.onReset();
              }}
            >
              重置
            </Button>
          </div>
        </div>
      </DocDemo>
    </div>
  );
};

export default FormBasic;

let styleContainer = css``;

const styleActions = css`
  margin-top: 16px;

  .ant-btn:not(:last-child) {
    margin-right: 16px;
  }
`;
