import React from "react";
import { Modal, Form, Input } from "antd";

export default function DynamicFormModal({
                                             isModalOpen,
                                             onOk,
                                             onCancel,
                                             title,
                                             fields,
                                             confirmLoading // 로딩 상태 추가
                                         }) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                console.log("폼 데이터:", values);
                onOk(values); // 부모로 폼 데이터 전달
            })
            .catch(info => {
                console.log("폼 검증 실패:", info);
            });
    };

    // 모달이 닫힐 때 폼 초기화
    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={title}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={confirmLoading} // 로딩 처리
        >
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
}