import React from 'react';

import './index.scss';

class ComparePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: []
        }
        this.selectedItems = [];

    }

    componentDidMount = () => {
        fetch("http://www.mocky.io/v2/5e86ec5531000011d8814754")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        // itemId: result.products.
                        itemNames: result.products.compareSummary.titles,
                        itemDisplayFeatures: result.products.featuresList[0],
                        itemGeneralFeature: result.products.featuresList[1],
                        itemInternetFeatures: result.products.featuresList[2],
                        itemImages: result.products.compareSummary.images,
                        itemPriceSummary: result.products.compareSummary.productPricingSummary
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    selectItem = (e, id) => {
        console.log(e.target.value);
        let self = this;
        this.setState({
            itemId: e.target.value
        }, () => {
            this.selectedItem = {
                itemId: this.state.itemId,
                itemImage: this.state.itemImages[this.state.itemId],
                itemDisplayFeatures: this.state.itemDisplayFeatures,
                itemGeneralFeature: this.state.itemGeneralFeature,
                itemInternetFeatures: this.state.itemInternetFeatures,
                itemPriceSummary: this.state.itemPriceSummary,
                itemName: this.state.itemNames[this.state.itemId]
            }
            self.selectedItems.push(this.selectedItem);
            this.forceUpdate();
            const itemNameAry = this.state.itemNames;
            delete itemNameAry[this.state.itemId];
            this.setState({
                itemName: itemNameAry
            })
            
        })
       
        
    }

    render() {
        console.log(this.state.itemNames);
        return (
            <React.Fragment>
                <div class="table_box">
                    <table id="table_tata" width="100%" collspacing="0" callpadding="0" border="0">
                        <tr >
                            <td class="bordernone">
                                <h1>Compare</h1>
                                <span>{this.selectedItems.length} item seleted</span>
                                <label for="show">
                                    {/* <input id="show" type="checkbox">
                                        Show me difference
                                    </input> */}
                                </label>
                            </td>
                            {this.selectedItems.length && this.selectedItems.map((idx, index) => {
                                return (
                                    <td class="bordernone">
                                        <div class="imgbox">
                                            <img src={idx.itemImage} alt={index} />
                                        </div>
                                        <h3>{idx.itemName['title']}</h3>
                                        <div class="price">
                                            <strong>&#8377;{idx.itemPriceSummary[this.state.itemId]['price']}</strong>
                                            <del>&#8377;{idx.itemPriceSummary[this.state.itemId]['finalPrice']}</del>
                                            <span>{idx.itemPriceSummary[this.state.itemId]['totalDiscount']}% off</span>
                                        </div>
                                    </td>
                                )
                            })}
                            {this.selectedItems.length !== 3 && <td class="bordernone" width="100">
                                <div class="imgbox imgbox_no">
                                    &nbsp;
                                </div>
                                <h3>Add Product </h3>
                                <select value={this.state.itemNames ? this.state.itemNames : ''} name="addItem" id="addItem" onChange={e => { this.selectItem(e, 'getItem') }}>
                                    {this.state.itemNames && Object.keys(this.state.itemNames).map(key => {
                                        return (
                                            <option value={key} key={key}>{this.state.itemNames[key].title}</option>
                                        )
                                    })}
                                </select>
                            </td>}
                        </tr>
                        <tr>
                        <th colspan="5">DISPLAY</th>
                        </tr>
                        <tr>
                            <td class="bold">Size</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                 return(
                                 <React.Fragment>
                                     <td>{id.itemDisplayFeatures.features[0].values[this.state.itemId]}</td>
                                    </React.Fragment>
                                )
                            }
                            )}
                        </tr>
                        <tr>
                            <td class="bold">Screen Type</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                return(
                                <React.Fragment>
                                    <td>{id.itemDisplayFeatures.features[1].values[this.state.itemId]}</td>
                                    </React.Fragment>
                                )
                            }
                            )}
                        </tr>
                        <tr>
                            <td class="bold">HD Technology and Resolution</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                return(
                                <React.Fragment>
                                    <td>{id.itemDisplayFeatures.features[2].values[this.state.itemId]}</td>
                                </React.Fragment>
                                )
                            }
                            )}
                        </tr>
                        <tr>
                        <th colspan="5">GENERAL FEATURES</th>
                        </tr>
                        <tr>
                            <td class="bold">Smart TV</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                return(
                                <React.Fragment>
                                    <td>{id.itemGeneralFeature.features[0].values[this.state.itemId]}</td>
                                </React.Fragment>
                                )
                            }
                            )}
                        </tr>
                        <tr>
                            <td class="bold">Curve TV</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                return(
                                <React.Fragment>
                                    <td>{id.itemGeneralFeature.features[1].values[this.state.itemId]}</td>
                                </React.Fragment>
                                )
                            }
                            )}
                        </tr>
                        <tr>
                            <td class="bold">TouchScreen</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                 return(
                                 <React.Fragment>
                                     <td>{id.itemGeneralFeature.features[2].values[this.state.itemId]}</td>
                                    </React.Fragment>
                                 )
                            }
                            )}
                        </tr>
                        <tr>
                            <td class="bold">Monitor Sensor</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                 return(
                                 <React.Fragment>
                                     <td>{id.itemGeneralFeature.features[3].values[this.state.itemId]}</td>
                                    </React.Fragment>
                                 )
                            }
                            )}
                        </tr>
                        <tr>
                            <td class="bold">Launch year</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                 return(
                                 <React.Fragment>
                                     <td>{id.itemGeneralFeature.features[4].values[this.state.itemId]}</td>
                                    </React.Fragment>
                                 )
                            }
                            )}
                        </tr>
                        <tr>
                            <td class="bold">In the Box</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                return(
                                <React.Fragment>
                                     <td>{id.itemGeneralFeature.features[5] && id.itemGeneralFeature.features[5].values[this.state.itemId]}</td>
                                </React.Fragment>
                                )
                            }
                            )}
                        </tr>
                        <tr>
                            <th colspan="5">INTERNET FEARTURES</th>
                        </tr>
                        <tr>
                            <td class="bold">Build-in-Wifi</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                 return(
                                 <React.Fragment>
                                    <td>{id.itemInternetFeatures.features[0].values[this.state.itemId]}</td>
                                </React.Fragment>
                                )
                            }
                            )}
                        </tr>
                        <tr>
                            <td class="bold">Wireless Ready</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                return(
                                <React.Fragment>
                                    <td>{id.itemInternetFeatures.features[1].values[this.state.itemId]}</td>
                                </React.Fragment>
                                )
                            }
                            )}
                        </tr>
                        <tr>
                            <td class="bold">3G Dongale Plug and Play</td>
                            { this.selectedItems && this.selectedItems.map((id, index) => {
                                return(
                                <React.Fragment>
                                    <td>{id.itemInternetFeatures.features[2].values[this.state.itemId]}</td>
                                </React.Fragment>
                                )
                            }
                            )}
                        </tr>
                    </table>
                </div>
            </React.Fragment>

        );
    }
}

export default ComparePage;