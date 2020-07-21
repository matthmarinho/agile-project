import React, { Component } from 'react';
import './style.css';
import { Layout, Select, Row, Col, Divider, Button } from 'antd';
import Chart from '../chart';
import fetchData from './../mock/data';
import { Option } from 'antd/lib/mentions';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const filterDefault = {
    category: ['Categoria 1', 'Categoria 2', 'Categoria 3'],
    product: ['Product 1', 'Product 2'],
    brand: ['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'],
}

class BasicLayout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            filteredData: [],
            filters: {},
            firstFilter: {},
            valueFilter: {},
        }
    }

    componentDidMount = () => {
        let data = fetchData();
        this.setFirstFilter()

        this.setState({
            data: data,
            filteredData: data
        }, () => this.preFilter())
    }

    setFirstFilter = () => {
        let firstFilter = {
            category: filterDefault.category[0],
            product: filterDefault.product[0],
            brand: filterDefault.brand[0],
        }

        this.setState({ 
            firstFilter: firstFilter,
        });
    }

    preFilter = () => {
        const { data, firstFilter } = this.state;
        
        let filteredData = data.filter(function(item) {
            for (var key in firstFilter) {
                if (item[key] === undefined || item[key] !== firstFilter[key])
                return false;
            }
            return true;
        });

        this.setState({ 
            valueFilter: firstFilter,
            filteredData: filteredData,
        });
    }

    filterData = (key, value) => {
        const { firstFilter } = this.state;

        let filter = { ...firstFilter };
        filter[key] = value;

        let filteredData = this.filterByKeys(filter)

        this.setState({ valueFilter: filter, filteredData: filteredData });
    }

    clearFilter = () => {
        const { firstFilter } = this.state;

        let filteredData = this.filterByKeys(firstFilter);
        
        this.setState({ 
            filteredData: filteredData,
            valueFilter: firstFilter
        });
    }

    filterByKeys = (filter) => {
        const { data } = this.state;

        return ( data.filter(function(item) {
                for (var key in filter) {
                    if (item[key] === undefined || item[key] !== filter[key])
                    return false;
                }
                return true;
            })
        );
    }

    processData = (data) => {
        return Object.entries(data.reduce((c, { month: key }) => (c[key] = (c[key] || 0) + 1, c), {}))
                     .map((e) => ( { month: e[0], value: e[1] * 100 } ));
    }

    render() {
        const { filteredData, valueFilter } = this.state;

        return (
            <Layout>
                <Header className="header">
                    <h2 className='title-site'>Sales Report</h2>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Col>
                            <Row gutter={[24, 24]}>
                                <Content className="site-layout-background" style={{ padding: '10px 24px 10px 24px', minHeight: 50 }}>
                                    <Row justify="space-between" align="middle">
                                        <Col span={2}>
                                            <h3 className="filter-title">Filters:</h3>
                                        </Col>
                                        <Col span={4}>
                                            <Row gutter={[6, 6]} align="middle" style={{ margin: '0px'}}>
                                                <Col>
                                                    <p className="filter-name">Category:</p>
                                                </Col>
                                                <Col>
                                                    <Select placeholder="Category..." value={valueFilter.category} style={{ width: '100%' }} 
                                                        onChange={(value) => this.filterData('category', value)}>
                                                        {filterDefault.category.map(item =>
                                                            <Option key={item}>{item}</Option>
                                                        )}
                                                    </Select>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={4}>
                                            <Row gutter={[6, 6]} align="middle" style={{ margin: '0px'}}>
                                                <Col>
                                                    <p className="filter-name">Product:</p>
                                                </Col>
                                                <Col>
                                                    <Select placeholder="Product..." value={valueFilter.product} style={{ width: '100%' }} 
                                                        onChange={(value) => this.filterData('product', value)}>
                                                        {filterDefault.product.map(item =>
                                                            <Option key={item}>{item}</Option>
                                                        )}
                                                    </Select>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={4}>
                                            <Row gutter={[6, 6]} align="middle" style={{ margin: '0px'}}>
                                                <Col>
                                                    <p className="filter-name">Brand:</p>
                                                </Col>
                                                <Col>
                                                    <Select placeholder="Brand..." value={valueFilter.brand} style={{ width: '100%' }} 
                                                        onChange={(value) => this.filterData('brand', value)}>
                                                        {filterDefault.brand.map(item =>
                                                            <Option key={item}>{item}</Option>
                                                        )}
                                                    </Select>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={4}>
                                            <Button type="primary" danger block onClick={this.clearFilter}>
                                                Clear Filter
                                            </Button>
                                        </Col>
                                    </Row>
                                </Content>
                            </Row>
                            <Row gutter={[24, 24]}>
                                <Content className="site-layout-background" style={{ padding: '24px', minHeight: 400, marginTop: '12px' }}>
                                    <div>
                                        <h3>Sales by Month</h3>
                                        <Divider />
                                        <Chart data={this.processData(filteredData)} />
                                    </div>
                                </Content>
                            </Row>
                        </Col>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Developed by Matthaeus Marinho</Footer>
            </Layout>
        );
    }
}

export default BasicLayout;
