import { Row, Col, Card, Button, List, Tag, Table, Timeline, Badge } from "antd";

const data = [
    { id: 1, name: "홍길동", email: "hong@example.com" },
    { id: 2, name: "김철수", email: "kim@example.com" },
];

const dataSource = [
    { id: 1, name: "홍길동", email: "hong@example.com" },
    { id: 2, name: "김철수", email: "kim@example.com" },
];

const columns = [
    { title: "이름", dataIndex: "name", key: "name" },
    { title: "이메일", dataIndex: "email", key: "email" },
]


export default function Home() {

    return (
        <>
            <Row gutter={[16, 16]}>
                {data.map((item) => (
                    <Col span={6} key={item.id}>
                        <Card
                            title={item.name}
                            extra={<Button size="small">수정</Button>}
                        >
                            <p>{item.email}</p>
                            <Button danger size="small">삭제</Button>
                        </Card>
                    </Col>
                ))}
            </Row>
            <hr/>
            <Row gutter={16}>
                <Col span={8}><Card title="오늘 가입 회원">23명</Card></Col>
                <Col span={8}><Card title="신규 주문">15건</Card></Col>
                <Col span={8}><Card title="공지사항">3건</Card></Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 10}}/>
            <hr/>
            <List
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button type="link">수정</Button>,
                            <Button type="link" danger>삭제</Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={item.name}
                            description={<Tag color={item.status === "활성" ? "green" : "red"}>{item.status}</Tag>}
                        />
                    </List.Item>
                )}
            />
            <hr/>
            <Timeline>
                <Timeline.Item>회원가입: 홍길동</Timeline.Item>
                <Timeline.Item>회원정보 수정: 김철수</Timeline.Item>
                <Timeline.Item>결제 완료: 이영희</Timeline.Item>
            </Timeline>
            <hr/>
            <Row gutter={16}>
                <Col span={6}>
                    <Badge count={5}>
                        <Card title="신규 주문">주문 대기</Card>
                    </Badge>
                </Col>
                <Col span={6}>
                    <Badge count={0} showZero>
                        <Card title="취소 주문">없음</Card>
                    </Badge>
                </Col>
            </Row>
        </>
    );
};