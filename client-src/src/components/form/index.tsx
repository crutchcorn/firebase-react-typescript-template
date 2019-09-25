import React, {ChangeEventHandler, FC, FocusEventHandler, useState} from "react";
import classnames from "classnames";

interface TextInputProps {
    label: string;
    error?: any;
    onChange: ChangeEventHandler;
    onBlur?: FocusEventHandler;
}

export const TextInput: FC<Partial<HTMLInputElement> & TextInputProps> = ({
                                                                              type,
                                                                              id,
                                                                              label,
                                                                              error: errorStr,
                                                                              value,
                                                                              onChange,
                                                                              className,
                                                                              ...props
                                                                          }) => {
    const inputErr = classnames(
        {
            error: !!errorStr
        },
        "text-input"
    );

    return (
        <div className={className}>
            <label htmlFor={id}>
                {label}
                {errorStr && (
                    <div className="msg-wrapper error">
                        <div>{errorStr}</div>
                    </div>
                )}
            </label>
            <input
                id={id}
                className={inputErr}
                type={type}
                value={value}
                onChange={onChange}
                {...(props as any)}
            />
        </div>
    );
};

interface TextAreaProps {
    error: Error;
    prefilledStr: string;
    onBlur: FocusEventHandler;
    onFocus: FocusEventHandler;
}

export const TextArea: FC<TextAreaProps & HTMLTextAreaElement> = ({
                                                                      error: errorBool,
                                                                      prefilledStr = "",
                                                                      onBlur: onBlurProp,
                                                                      className,
                                                                      onFocus: onFocusProp,
                                                                      id,
                                                                      ...props
                                                                  }) => {
    const [focused, setFocused] = useState(false);

    const frameClasses = classnames(
        {
            error: !!errorBool,
            focused: !!focused
        },
        "textarea-frame",
        className
    );

    return (
        <>
            <div className={frameClasses}>
        <textarea
            className="full-width"
            id={id}
            onFocus={event => {
                setFocused(true);
                if (onFocusProp) {
                    onFocusProp(event);
                }
            }}
            onBlur={event => {
                setFocused(false);
                if (onBlurProp) {
                    onBlurProp(event);
                }
            }}
            value={prefilledStr}
            {...(props as any)}
        />
            </div>
            {errorBool && (
                <p className="error">
                    {" "}
                    {errorBool}{" "}
                </p>
            )}
        </>
    );
};
