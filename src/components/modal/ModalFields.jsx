import {Select, Input} from "antd";
import React from "react";

const { Option } = Select;
const { TextArea } = Input;

export const COMMON_CODE_GROUP = [
    { name: "group_code", label: "그룹코드", rules: [{ required: true }] },
    { name: "group_name", label: "그룹명", rules: [{ required: true }] },
    {
        name: "role",
        label: "역할",
        rules: [{ required: true }],
        component: (
            <Select placeholder="역할 선택">
                <Option value="admin">관리자</Option>
                <Option value="user">사용자</Option>
                <Option value="user">사용자</Option>
                <Option value="user">사용자</Option>
            </Select>
        ),
    },
    {
        name: "note",
        label: "메모",
        component: <TextArea rows={9} placeholder="메모 입력" />,
    },
]

export const COMMON_CODE = [
    { name: "code", label: "코드", rules: [{ required: true }] },
    { name: "code_name", label: "코드명", rules: [{ required: true }] },
]