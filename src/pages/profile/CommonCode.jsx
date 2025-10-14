import React, {useEffect, useState} from "react";
import { Row, Col, Card, Table, Button, Space } from "antd";

import DynamicFormModal from "@components/modal/DynamicFormModal";
import * as modalField from "@components/modal/ModalFields";

import * as gateway from "@components/common/Gateway";

export default function CommonCode() {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [modalFields, setModalFields] = useState([]);

    const [modalType, setModalType] = useState("");

    const [groupData, setGroupData] = useState([]);
    const [codeData, setCodeData] = useState([]);

    const groupColumns = [
        { title: "그룹코드", dataIndex: "groupCode", key: "groupCode" },
        { title: "그룹명", dataIndex: "groupName", key: "groupName" },
        {
            title: "액션",
            key: "action",
            render: (_, record) => (
                <Button type="link" onClick={() => groupSelect(record)}>
                    상세보기
                </Button>
            ),
        },
    ];

    const groupSelect = (record) => {
        setSelectedGroup(record.groupName);
        setSelectedGroupId(record.groupId);
    }

    const codeColumns = [
        { title: "코드", dataIndex: "commonCode", key: "commonCode" },
        { title: "코드명", dataIndex: "commonCodeName", key: "commonCodeName" },
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
        setTitle("코드 그룹 추가");
        setModalFields(modalField.COMMON_CODE_GROUP);
        setModalType("GROUP")
        setIsModalOpen(true);
    };

    const openOrderModal = () => {
        setTitle("코드 상세 추가");
        setModalFields(modalField.COMMON_CODE);
        setModalType("CODE")
        setIsModalOpen(true);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    }

    const handleModalOk = async (formData) => {
        try {
            if (modalType === "GROUP") {
                await gateway.post("/admin-profile/api/v1/group/insert", formData);
                fetchGroupData();
            } else if (modalType === "CODE") {
                const payload = {
                    ...formData,
                    groupId: selectedGroupId
                };
                await gateway.post("/admin-profile/api/v1/common/insert", payload);
                fetchCodeData();
            }

            setIsModalOpen(false);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchGroupData();
    }, []);

    const fetchGroupData = async () => {
        try {
            const response = await gateway.post("/admin-profile/api/v1/group/select");
            setGroupData(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchCodeData();
    }, [selectedGroupId]);

    const fetchCodeData = async () => {
        try {
            const payload = {
                groupId: selectedGroupId,
            }

            const response = await gateway.post("/admin-profile/api/v1/common/select", payload);
            setCodeData(response.data);
        } catch (e) {
            console.error(e);
        }
    }

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
                        selectedGroup ? `코드 상세 (${selectedGroup})` : "코드 상세 (그룹 선택 필요)"
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
                            dataSource={codeData}
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
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                title={title}
                fields={modalFields}
            />
        </Row>
    );
};
