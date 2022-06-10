/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface TodoApp {
    }
    interface TodoFooter {
        "filter": string;
    }
    interface TodoInput {
        "autofocus": boolean;
        "classes": string;
        "placeholder": string;
        "purpose": string;
    }
    interface TodoItem {
        "completed": boolean;
        "itemId": string;
        "itemTitle": string;
    }
    interface TodoList {
        "filter": string;
    }
    interface TodoToggle {
        "allChecked": boolean;
    }
}
declare global {
    interface HTMLTodoAppElement extends Components.TodoApp, HTMLStencilElement {
    }
    var HTMLTodoAppElement: {
        prototype: HTMLTodoAppElement;
        new (): HTMLTodoAppElement;
    };
    interface HTMLTodoFooterElement extends Components.TodoFooter, HTMLStencilElement {
    }
    var HTMLTodoFooterElement: {
        prototype: HTMLTodoFooterElement;
        new (): HTMLTodoFooterElement;
    };
    interface HTMLTodoInputElement extends Components.TodoInput, HTMLStencilElement {
    }
    var HTMLTodoInputElement: {
        prototype: HTMLTodoInputElement;
        new (): HTMLTodoInputElement;
    };
    interface HTMLTodoItemElement extends Components.TodoItem, HTMLStencilElement {
    }
    var HTMLTodoItemElement: {
        prototype: HTMLTodoItemElement;
        new (): HTMLTodoItemElement;
    };
    interface HTMLTodoListElement extends Components.TodoList, HTMLStencilElement {
    }
    var HTMLTodoListElement: {
        prototype: HTMLTodoListElement;
        new (): HTMLTodoListElement;
    };
    interface HTMLTodoToggleElement extends Components.TodoToggle, HTMLStencilElement {
    }
    var HTMLTodoToggleElement: {
        prototype: HTMLTodoToggleElement;
        new (): HTMLTodoToggleElement;
    };
    interface HTMLElementTagNameMap {
        "todo-app": HTMLTodoAppElement;
        "todo-footer": HTMLTodoFooterElement;
        "todo-input": HTMLTodoInputElement;
        "todo-item": HTMLTodoItemElement;
        "todo-list": HTMLTodoListElement;
        "todo-toggle": HTMLTodoToggleElement;
    }
}
declare namespace LocalJSX {
    interface TodoApp {
    }
    interface TodoFooter {
        "filter"?: string;
    }
    interface TodoInput {
        "autofocus"?: boolean;
        "classes"?: string;
        "placeholder"?: string;
        "purpose"?: string;
    }
    interface TodoItem {
        "completed"?: boolean;
        "itemId"?: string;
        "itemTitle"?: string;
    }
    interface TodoList {
        "filter"?: string;
    }
    interface TodoToggle {
        "allChecked"?: boolean;
    }
    interface IntrinsicElements {
        "todo-app": TodoApp;
        "todo-footer": TodoFooter;
        "todo-input": TodoInput;
        "todo-item": TodoItem;
        "todo-list": TodoList;
        "todo-toggle": TodoToggle;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "todo-app": LocalJSX.TodoApp & JSXBase.HTMLAttributes<HTMLTodoAppElement>;
            "todo-footer": LocalJSX.TodoFooter & JSXBase.HTMLAttributes<HTMLTodoFooterElement>;
            "todo-input": LocalJSX.TodoInput & JSXBase.HTMLAttributes<HTMLTodoInputElement>;
            "todo-item": LocalJSX.TodoItem & JSXBase.HTMLAttributes<HTMLTodoItemElement>;
            "todo-list": LocalJSX.TodoList & JSXBase.HTMLAttributes<HTMLTodoListElement>;
            "todo-toggle": LocalJSX.TodoToggle & JSXBase.HTMLAttributes<HTMLTodoToggleElement>;
        }
    }
}
