import * as React from "react";
import { HoForm, ComponentRegistry } from "./../../../components/HoForm";
import { MultiFormatDataDisplay } from "./../../../components/MultiFormatDataDisplay";
import dynamicFormComponents from "./../../../components/HokusForm/components/all";
import { FormBreadcumb } from "./../../../components/Breadcumb";
import { HokusForm } from "../../../components/HokusForm";
import { Tabs, Tab } from "material-ui";

const componentRegistry = new ComponentRegistry(dynamicFormComponents);

type FormsBuilderProps = {};
type FormsBuilderState = {
  form: any;
  formKey: number;
};

export class FormsBuilder extends React.Component<FormsBuilderProps, FormsBuilderState> {
  formRef: any;
  state: FormsBuilderState = {
    form: {},
    formKey: 1
  };

  constructor(props: FormsBuilderProps) {
    super(props);
  }

  handleFormRef = (ref: any) => {
    this.formRef = ref;
  };

  handleSave = (arg1: { data: any; accept: any; reject: any }) => {
    this.setState({ form: arg1.data, formKey: ++this.state.formKey });
    arg1.accept();
  };

  render() {
    const includes = {
      fieldsAccordionInclude: [
        {
          key: "fields",
          type: "accordion",
          title: "fields",
          itemTitleKey: "key",
          fields: [{ key: "anyFieldInclude", type: "include", include: "anyFieldInclude" }]
        }
      ],
      anyFieldInclude: [
        { key: "baseFieldInclude", type: "include", include: "baseFieldInclude" },
        {
          key: "type",
          title: "type",
          type: "select",
          options: [
            { value: "accordion" },
            { value: "boolean" },
            { value: "bundle-manager" },
            { value: "bundle-image-thumbnail" },
            { value: "chips" },
            { value: "code-editor" },
            { value: "data-nest" },
            { value: "date" },
            { value: "empty-line" },
            { value: "extend" },
            { value: "hidden" },
            { value: "info" },
            { value: "markdown" },
            { value: "nest" },
            { value: "number" },
            { value: "readonly" },
            { value: "section" },
            { value: "select" },
            { value: "string" }
          ],
          default: "string",
          required: true
        },
        {
          key: "typeExtend",
          type: "extend",
          nest: false,
          groupdata: false,
          selectorKey: "type",
          fields: [],
          clearExcept: ["key"],
          types: [
            { key: "accordion", fields: [{ key: "accordionInclude", type: "include", include: "accordionInclude" }] },
            { key: "boolean", fields: [{ key: "booleanInclude", type: "include", include: "booleanInclude" }] },
            {
              key: "bundle-manager",
              fields: [{ key: "bundleManagerInclude", type: "include", include: "bundleManagerInclude" }]
            },
            {
              key: "bundle-image-thumbnail",
              fields: [{ key: "bundleImageThumbnailInclude", type: "include", include: "bundleImageThumbnailInclude" }]
            },
            { key: "chips", fields: [{ key: "chipsInclude", type: "include", include: "chipsInclude" }] },
            {
              key: "code-editor",
              fields: [{ key: "codeEditorInclude", type: "include", include: "codeEditorInclude" }]
            },
            { key: "dataNest", fields: [{ key: "dataNestInclude", type: "include", include: "dateNestInclude" }] },
            { key: "date", fields: [{ key: "dateInclude", type: "include", include: "dateInclude" }] },
            { key: "empty-line", fields: [{ key: "emptyLineInclude", type: "include", include: "emptyLineInclude" }] },
            { key: "extend", fields: [{ key: "extendInclude", type: "include", include: "extendInclude" }] },
            { key: "hidden", fields: [{ key: "hiddenInclude", type: "include", include: "hiddenInclude" }] },
            { key: "info", fields: [{ key: "infoInclude", type: "include", include: "infoInclude" }] },
            { key: "markdown", fields: [{ key: "markdownInclude", type: "include", include: "markdownInclude" }] },
            { key: "number", fields: [{ key: "numberInclude", type: "include", include: "numberInclude" }] },
            { key: "nest", fields: [{ key: "nestInclude", type: "include", include: "nestInclude" }] },
            { key: "readonly", fields: [{ key: "readonlyInclude", type: "include", include: "readonlyInclude" }] },
            { key: "section", fields: [{ key: "sectionInclude", type: "include", include: "sectionInclude" }] },
            { key: "select", fields: [{ key: "selectInclude", type: "include", include: "selectInclude" }] },
            { key: "string", fields: [{ key: "textFieldInclude", type: "include", include: "textFieldInclude" }] }
          ]
        }
      ],
      baseFieldInclude: [{ key: "key", type: "string", title: "key", required: true }],
      accordionInclude: [
        { key: "title", title: "title", type: "string", required: true },
        { key: "itemTitleKey", title: "itemTitleKey", type: "string" },
        { key: "itemTitleFallbackKey", title: "itemTitleFallbackKey", type: "string" },
        { key: "fieldsAccordionInclude", type: "include", include: "fieldsAccordionInclude" }
      ],
      booleanInclude: [
        { key: "title", title: "title", type: "string", required: true },
        { key: "default", title: "default", type: "boolean", default: false },
        { key: "tip", title: "tip", type: "string" }
      ],
      bundleManagerInclude: [
        { key: "title", title: "title", type: "string", required: true },
        { key: "path", title: "path", type: "string" },
        {
          key: "extensions",
          title: "extensions",
          type: "leaf-array",
          field: {
            key: "item",
            type: "string",
            required: true
          }
        },
        { key: "fieldsAccordionInclude", type: "include", include: "fieldsAccordionInclude" }
      ],
      bundleImageThumbnailInclude: [{ key: "src", title: "src", type: "string", required: false }],
      chipsInclude: [
        { key: "title", title: "title", type: "string", required: true },
        { key: "default", title: "default", type: "chips" }
      ],
      codeEditorInclude: [
        { key: "title", title: "title", type: "string", required: true },
        { key: "language", title: "language", type: "string", required: false },
        { key: "default", title: "default", type: "string", multiLine: true, default: false },
        { key: "tip", title: "tip", type: "string" },
        { key: "lightTheme", title: "lightTheme", type: "boolean", default: true }
      ],
      dataNestInclude: [{ key: "fieldsAccordionInclude", type: "include", include: "fieldsAccordionInclude" }],
      dateInclude: [
        { key: "title", title: "title", type: "string", required: true },
        // { key: "required", title: "required", type: "boolean", default: false },
        { key: "default", title: "default", type: "date" },
        { key: "tip", title: "tip", type: "string" }
      ],
      emptyLineInclude: [{ key: "amount", title: "amount", type: "number" }],
      extendInclude: [
        { key: "fieldsAccordionInclude", type: "include", include: "fieldsAccordionInclude" },
        // initialState?: { [key: string]: any };
        { key: "selectorKey", title: "selectorKey", type: "string", required: true },
        {
          key: "types",
          type: "accordion",
          title: "types",
          fields: [
            { key: "type", title: "type", type: "string", required: true },
            { key: "fieldsAccordionInclude", type: "include", include: "fieldsAccordionInclude" }
          ]
        },
        { key: "clearOnChange", title: "clearOnChange", type: "leaf-array", field: { key: "key", type: "string" } },
        { key: "clearExcept", title: "clearExcept", type: "leaf-array", field: { key: "key", type: "string" } }
      ],
      infoInclude: [
        { key: "content", title: "content", type: "markdown", multiLine: true },
        {
          key: "size",
          title: "size",
          type: "select",
          default: "default",
          options: [{ value: "small" }, { value: "default" }, { value: "large" }]
        },
        { key: "lineHeight", title: "lineHeight", type: "number", default: 1.2 },
        {
          key: "theme",
          title: "theme",
          type: "select",
          default: "default",
          options: [
            { value: "default" },
            { value: "bare" },
            { value: "warn" },
            { value: "warn-bare" },
            { value: "black" },
            { value: "black-bare" },
            { value: "gray" },
            { value: "gray-bare" }
          ]
        }
      ],
      hiddenInclude: [
        { key: "value", title: "value", type: "string", required: false },
        { key: "default", title: "default", type: "string", required: false }
      ],
      markdownInclude: [
        { key: "title", title: "title", type: "string", required: true },
        { key: "multiLine", title: "multiLine", type: "boolean", default: true },
        { key: "default", title: "default", type: "markdown", multiLine: true, default: false },
        { key: "tip", title: "tip", type: "string" }
      ],
      nestInclude: [
        { key: "title", title: "title", type: "string", required: true },
        { key: "groupdata", title: "groupdata", type: "boolean", default: false },
        { key: "fieldsAccordionInclude", type: "include", include: "fieldsAccordionInclude" }
      ],
      numberInclude: [
        { key: "title", title: "title", type: "string", required: true },
        // { key: "required", title: "required", type: "boolean", default: false },
        { key: "default", title: "default", type: "number" },
        { key: "tip", title: "tip", type: "string" }
      ],
      readonlyInclude: [
        { key: "title", title: "title", type: "string", required: true },
        { key: "required", title: "required", type: "boolean", default: false },
        { key: "value", title: "default", type: "string" },
        { key: "default", title: "default", type: "string" },
        { key: "multiLine", title: "multiLine", type: "boolean", default: false },
        {
          key: "defaultExtend",
          type: "extend",
          selectorKey: "multiLine",
          clearOnChange: [],
          types: [
            {
              key: "true",
              fields: [{ key: "default", title: "default", type: "string", multiLine: true }]
            },
            {
              key: "false",
              fields: [{ key: "default", title: "default", type: "string" }]
            }
          ]
        },
        { key: "tip", title: "tip", type: "string" }
      ],
      textFieldInclude: [
        { key: "title", title: "title", type: "string", required: true },
        { key: "required", title: "required", type: "boolean", default: false },
        { key: "pattern", title: "pattern", type: "string", required: false },
        { key: "multiLine", title: "multiLine", type: "boolean", default: false },
        {
          key: "defaultExtend",
          type: "extend",
          selectorKey: "multiLine",
          clearOnChange: [],
          types: [
            {
              key: "true",
              fields: [{ key: "default", title: "default", type: "string", multiLine: true }]
            },
            {
              key: "false",
              fields: [{ key: "default", title: "default", type: "string" }]
            }
          ]
        },
        { key: "tip", title: "tip", type: "string" }
      ],
      sectionInclude: [
        { key: "title", title: "title", type: "string", required: true },
        { key: "groupdata", title: "groupdata", type: "boolean", default: false },
        { key: "fieldsAccordionInclude", type: "include", include: "fieldsAccordionInclude" }
      ],
      selectInclude: [
        { key: "title", title: "title", type: "string", required: true },
        {
          key: "options",
          title: "options",
          type: "accordion",
          itemTitleKey: "value",
          fields: [
            { key: "value", title: "value", type: "string" },
            { key: "text", title: "text", type: "string" }
          ]
        },
        { key: "multiple", title: "multiple", type: "boolean", default: false },
        { key: "required", title: "required", type: "boolean", default: false },
        {
          key: "multipleExtend",
          selectorKey: "multiple",
          type: "extend",
          clearOnChange: ["default"],
          types: [
            {
              key: "false",
              fields: [{ key: "default", title: "default", type: "string", default: "" }]
            },
            {
              key: "true",
              fields: [
                {
                  key: "default",
                  title: "default",
                  type: "leaf-array",
                  field: { key: "value", title: "Value", type: "string" },
                  default: []
                }
              ]
            }
          ]
        },
        { key: "tip", title: "tip", type: "string" }
      ]
    };

    const fields = this.state.form?.fields || [];

    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1", position: "relative" }}>
          <HokusForm
            onSave={this.handleSave}
            rootName={"Form Builder"}
            includes={includes}
            ref={this.handleFormRef}
            fields={[{ key: "fieldsAccordionInclude", type: "include", include: "fieldsAccordionInclude" }]}
            values={{}}
            plugins={{
              openBundleFileDialog: function({ title, extensions, targetPath }: any, onFilesReady: any) {
                alert("This operation is not supported in the Cookbook. But we'll mock something for you.");
                return Promise.resolve([`${targetPath}/some-file.${extensions[0] || "png"}`]);
              },
              getBundleThumbnailSrc: function(targetPath: string) {
                return Promise.resolve(
                  "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
                );
              }
            }}
          />
        </div>
        <div style={{ padding: "1rem", flex: "1" }}>
          <HoForm
            key={this.state.formKey}
            rootName={"Resulting Form"}
            includes={includes}
            ref={this.handleFormRef}
            breadcumbComponentType={FormBreadcumb}
            fields={
              fields.length === 0
                ? [
                    {
                      key: "emptyInfo",
                      content: "Your form is empty. Add fields to it to see a preview.",
                      type: "info"
                    }
                  ]
                : fields
            }
            debug={true}
            componentRegistry={componentRegistry}
            values={{}}
            plugins={{
              openBundleFileDialog: function({ title, extensions, targetPath }: any, onFilesReady: any) {
                alert("This operation is not supported in the FormBuilder. But we'll mock something for you.");
                return Promise.resolve([`${targetPath}/some-file.${extensions[0] || "png"}`]);
              },
              getBundleThumbnailSrc: function(targetPath: string) {
                return Promise.resolve(
                  "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
                );
              }
            }}
          />
          <br />
          <MultiFormatDataDisplay data={{ fields }} />
        </div>
      </div>
    );
  }
}
