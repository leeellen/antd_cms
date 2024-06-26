import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import ImgCrop from 'antd-img-crop';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Flex,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Upload,
    message,
} from 'antd';
import { getPreview } from '../../utils/helper';

const { Option } = Select;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

export default function Setting() {
    const [img, setImg] = useState();
    const [preview, setPreview] = useState();

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="USD">$</Option>
                <Option value="CNY">¥</Option>
            </Select>
        </Form.Item>
    );

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));

    const beforeUpload = (file) => {
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isLt5M) {
            message.error(`파일의 용량은 5MB 보다 작아야합니다.`);
            return false;
        }

        if (file) {
            console.log('file', file);
            setImg(file);
            getPreview(file, (preview) => setPreview(preview));
        }
        return true;
    };

    const onDelete = () => {
        setImg('');
        setPreview('');
    };

    return (
        <article className="content-wrapper">
            <PageTitle title="계정 설정" />

            <Flex gap={50}>
                <Flex vertical gap={10} style={{ width: 'fit-content' }}>
                    <ImgCrop rotationSlider>
                        <Upload listType="picture-circle" showUploadList={false} beforeUpload={beforeUpload}>
                            {preview ? <img src={preview} alt="profile" /> : '+ Upload'}
                        </Upload>
                    </ImgCrop>
                    <Button danger type="primary" onClick={onDelete}>
                        사진 삭제
                    </Button>
                </Flex>

                <Form
                    layout="vertical"
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                    scrollToFirstError
                    style={{ width: '100%' }}
                >
                    <section
                        style={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat( auto-fit, minmax(350px, 1fr) )',
                            gap: 30,
                        }}
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error('The new password that you entered do not match!'),
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="nickname"
                            label="Nickname"
                            tooltip="What do you want others to call you?"
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="residence"
                            label="Habitual Residence"
                            rules={[
                                { type: 'array', required: true, message: 'Please select your habitual residence!' },
                            ]}
                        >
                            <Cascader options={residences} />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="donation"
                            label="Donation"
                            rules={[{ required: true, message: 'Please input donation amount!' }]}
                        >
                            <InputNumber addonAfter={suffixSelector} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="website"
                            label="Website"
                            rules={[{ required: true, message: 'Please input website!' }]}
                        >
                            <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                                <Input />
                            </AutoComplete>
                        </Form.Item>

                        <Form.Item
                            name="intro"
                            label="Intro"
                            rules={[{ required: true, message: 'Please input Intro' }]}
                        >
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: 'Please select gender!' }]}
                        >
                            <Select placeholder="select your gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item
                                        name="captcha"
                                        noStyle
                                        rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Button>Get captcha</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </section>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: 30 }} size="large">
                            save
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </article>
    );
}
