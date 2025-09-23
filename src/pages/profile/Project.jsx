import React from "react";
import { Table, Button, Space, Card } from "antd";

const dataSource = Array.from({ length: 23 }).map((_, idx) => ({
    key: idx + 1,
    name: `홍길동 ${idx + 1}`,
    email: `user${idx + 1}@example.com`,
    role: idx % 2 === 0 ? "관리자" : "사용자",
}));

const columns = [
    { title: "이름", dataIndex: "name", key: "name" },
    { title: "이메일", dataIndex: "email", key: "email" },
    { title: "역할", dataIndex: "role", key: "role" },
    {
        title: "액션",
        key: "action",
        render: () => (
            <Space>
                <Button type="primary" size="small">
                    수정
                </Button>
                <Button danger size="small">
                    삭제
                </Button>
            </Space>
        ),
    },
];

export default function Project() {
    return (
        <Card title="프로젝트 관리" style={{ padding: 24 }}>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 10 }}
            />
        </Card>
    )
}