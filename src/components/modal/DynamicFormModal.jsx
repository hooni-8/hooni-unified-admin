import React from "react";
import { Modal, Form, Input } from "antd";

export default function DynamicFormModal({ isModalOpen, onOk, onCancel, title, fields }) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                console.log("폼 데이터:", values);
                onOk(); // 정상 처리
            })
            .catch(info => {
                console.log("폼 검증 실패:", info);
                // 여기서 별도 처리 가능, 모달은 열려있음
            });
    };

    return (
        <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={onCancel}>
            <Form form={form} layout="vertical">
                {fields.map((field) => (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        rules={field.rules || []}
                    >
                        {field.component || <Input />}
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    );
};