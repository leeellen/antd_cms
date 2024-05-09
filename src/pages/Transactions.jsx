import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'antd';
import PageTitle from '../components/PageTitle';
import useTableSearch from '../hooks/useTableSearch';

const tempData = new Array(100).fill(0).map((e, i) => ({
    index: i + 1,
    detail: `Transactions ${i + 1}`,
    type: i % 2 ? 'Debit' : 'credit',
    balance: 1000 * i,
}));
export default function Transactions() {
    const getColumnSearchProps = useTableSearch();

    const columns = [
        {
            title: 'No.',
            dataIndex: 'index',
            key: 'index',
            render: (value, record) => (
                <Link to={`${record.newsId}`}>
                    <p>{value}</p>
                </Link>
            ),
            align: 'center',
        },
        {
            title: '결제 내역',
            dataIndex: 'detail',
            key: 'detail',
            render: (value, record) => (
                <Link to={`${record.index}`}>
                    <p>{value}</p>
                </Link>
            ),
            align: 'center',
        },
        {
            title: '카드 타입',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
            render: (_, record) => (
                <Link to={`${record.index}`}>
                    <p>{record.type}</p>
                </Link>
            ),
        },
        {
            title: '결제 금액',
            dataIndex: 'balance',
            key: 'balance',
            render: (value, record) => (
                <Link to={`${record.index}`}>
                    <p>${value.toLocaleString()}</p>
                </Link>
            ),
        },
    ];

    return (
        <article>
            <PageTitle
                title="Transactions"
                desc="결제 내역을 관리할 수 있는 페이지입니다."
                addonBtn={
                    <Link to="create">
                        <Button type="primary" size="large">
                            결제 직접 등록
                        </Button>
                    </Link>
                }
            />
            <Table
                dataSource={tempData}
                columns={columns}
                pagination={{
                    position: ['bottomCenter'],
                    showSizeChanger: false,
                }}
            />
        </article>
    );
}
