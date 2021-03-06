import React from "react";
import IconButton from "material-ui/IconButton";
import IconButtonGroup from "../../IconButtonGroup";
import RaisedButton from "material-ui/RaisedButton";
import DefaultWrapper from "./shared/DefaultWrapper";
import IconAdd from "material-ui/svg-icons/content/add";
import IconRemove from "material-ui/svg-icons/content/remove";
import { BaseDynamic, FieldBase, NormalizeStateContext, CrawlContext } from "../../HoForm";

class TextFieldLabelMock extends React.Component<{ children: any }, {}> {
  render() {
    return (
      <label
        style={{
          display: "block",
          lineHeight: "22px",
          fontSize: 12,
          pointerEvents: "none",
          userSelect: "none",
          color: "rgba(0, 0, 0, 0.3)"
        }}
      >
        {this.props.children}
      </label>
    );
  }
}

type LeafArrayDynamicField = {
  key: string;
  type: string;
  field: any;
  title: string;
  default?: any;
};

class LeafArrayDynamic extends BaseDynamic<LeafArrayDynamicField, { hasError: boolean }> {
  normalizeState(x: NormalizeStateContext<LeafArrayDynamicField>) {
    let key = x.field.key;
    if (x.state[key] === undefined) {
      x.state[key] = x.field.default || [];
    }
  }

  getType() {
    return "leaf-array";
  }

  deepEqual(array: Array<any>, otherArray: Array<any>): boolean {
    if (array.length !== otherArray.length) return false;

    for (let i = 0; i < array.length; i++) {
      if (array[i] !== otherArray[i]) return false;
    }

    return true;
  }

  pushEmptyValue = () => {
    let context = this.props.context;
    context.value = context.value || [];
    let childField = Object.assign({}, Object.assign({}, this.props.context.node.field.field));
    childField.key = context.value.length;
    let childComponentProplessInstance = context.form.props.componentRegistry.getProplessInstance(childField.type);
    let valueCopy = context.value.slice(0);
    childComponentProplessInstance.normalizeState({
      state: valueCopy,
      field: childField,
      stateBuilder: context.form.stateBuilder,
      includes: context.form.props.includes
    });
    context.setValue(valueCopy);
  };

  getOnRequestDeleteHandler(index: number): () => void {
    return () => {
      let context = this.props.context;
      let copy = context.value.slice(0);
      copy.splice(index, 1);
      context.setValue(copy);
    };
  }

  getOnItemChange(index: number): (value: any) => void {
    return (value: any) => {
      console.log(value, index);
      let context = this.props.context;
      let copy = context.value.slice(0);
      copy[index] = value;
      context.setValue(copy);
    };
  }

  crawlComponent({ form, node }: CrawlContext<LeafArrayDynamicField>): void {
    const value = this.getValueFromNode(node) || [];
    for (let childIndex = 0; childIndex < value.length; childIndex++) {
      let childNode = {
        state: value,
        field: Object.assign({}, node.field.field, { key: childIndex.toString() }),
        parent: node
      };
      form.crawlField(childNode);
    }
  }

  renderComponent() {
    let { context } = this.props;
    let { node, currentPath } = context;
    let { field } = node;

    if (currentPath !== context.parentPath) {
      return null;
    }

    let arrayData = context.value;
    return (
      <DefaultWrapper>
        <TextFieldLabelMock>{field.title}</TextFieldLabelMock>
        {(arrayData || []).map((item: any, index: number) => {
          let childNode = {
            state: context.value,
            field: Object.assign({}, field.field, { key: index }),
            parent: context.node.parent
          };
          return (
            <div key={field.key + "-item-" + index} style={{ display: "flex", width: "100%" }}>
              {context.form.renderField(childNode, this.getOnItemChange(index))}
              <IconButtonGroup
                style={{ flex: "0 0 auto", alignSelf: "flex-end", position: "relative", top: "-20px" }}
                iconButtons={[
                  <IconButton onClick={this.getOnRequestDeleteHandler(index)}>
                    <IconRemove />
                  </IconButton>
                ]}
              />
            </div>
          );
        })}
        <RaisedButton style={{ marginTop: "20px" }} onClick={this.pushEmptyValue} icon={<IconAdd />} />
      </DefaultWrapper>
    );
  }
}

export default LeafArrayDynamic;
