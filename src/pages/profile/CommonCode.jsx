import React, { useState } from "react";
import { Row, Col, Card, Table, Button, Space } from "antd";

import DynamicFormModal from "@components/modal/DynamicFormModal";
import * as modalField from "@components/modal/ModalFields";

const groupData = Array.from({ length: 23 }).map((_, idx) => ({
    key: String(idx + 1),
    groupCode: `GROUP_${idx + 1}`,
    groupName: `그룹명 ${idx + 1}`,
}));

const codeData = {
    GROUP_1: Array.from({ length: 35 }).map((_, idx) => ({
        key: String(idx + 1),
        code: `CODE_${idx + 1}`,
        name: `코드명 ${idx + 1}`,
    })),
};

export default function CommonCode() {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [modalFields, setModalFields] = useState([]);

    const groupColumns = [
        { title: "그룹코드", dataIndex: "groupCode", key: "groupCode" },
        { title: "그룹명", dataIndex: "groupName", key: "groupName" },
        {
            title: "액션",
            key: "action",
            render: (_, record) => (
                <Button type="link" onClick={() => setSelectedGroup(record.groupCode)}>
                    상세보기
                </Button>
            ),
        },
    ];

    const codeColumns = [
        { title: "코드", dataIndex: "code", key: "code" },
        { title: "코드명", dataIndex: "name", key: "name" },
        {
            title: "액션",
            key: "action",
            render: () => (
                <Space>
                    <Button type="link">수정</Button>
                    <Button type="link" danger>
                        삭제
                    </Button>
                </Space>
            ),
        },
    ];

    const openUserModal = () => {
        setTitle("공통코드 그룹 추가");
        setModalFields(modalField.COMMON_CODE_GROUP);
        setIsModalOpen(true);
    };

    const openOrderModal = () => {
        setTitle("코드 상세 추가");
        setModalFields(modalField.COMMON_CODE);
        setIsModalOpen(true);
    };

    return (
        <Row gutter={16} style={{ padding: 24 }}>
            {/* 그룹 영역 */}
            <Col span={8}>
                <Card title="공통코드 그룹" extra={
                    <Button
                        type="primary"
                        onClick={() => openUserModal()}
                    >추가</Button>
                }>
                    <Table
                        dataSource={groupData}
                        columns={groupColumns}
                        pagination={{ pageSize: 9 }}
                    />
                </Card>
            </Col>

            {/* 코드 영역 */}
            <Col span={16}>
                <Card
                    title={
                        selectedGroup
                            ? `코드 상세 (${selectedGroup})`
                            : "코드 상세 (그룹 선택 필요)"
                    }
                    extra={
                        selectedGroup && (
                            <Button type="primary" onClick={() => openOrderModal()}>
                                코드 추가
                            </Button>
                        )
                    }
                >
                    {selectedGroup ? (
                        <Table
                            dataSource={codeData[selectedGroup] || []}
                            columns={codeColumns}
                            pagination={{ pageSize: 9 }}
                        />
                    ) : (
                        <p>좌측에서 그룹을 선택해주세요.</p>
                    )}
                </Card>
            </Col>

            <DynamicFormModal
                isModalOpen={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                title={title}
                fields={modalFields}
            />
        </Row>
    );
};
