import React from 'react';

import './index.scss';

class ComparePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            itemId: ''
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

    removeItem = (e, id) => {
        let itemList = this.state.itemNames;
        const deletedProduct = this.selectedItems.filter(el => el.itemId === id.itemId)
        let itemIdToPush = deletedProduct[0].itemId;
        let itemNameToPush = deletedProduct[0].itemName;
        itemList[itemIdToPush] = itemNameToPush;
        let x = this.selectedItems.filter(el => el.itemId !== id.itemId)
        this.selectedItems = x;
        this.setState({
            itemName: itemList
        })
        this.forceUpdate();

    } 

    render() {
        return (
            <React.Fragment>
                <div className="table_box">
                    <table id="table_tata" width="100%" collspacing="0" callpadding="0" border="0">
                        <tr >
                            <td className="bordernone">
                                <h1>Compare</h1>
                                <span>{this.selectedItems.length} item seleted</span>
                                <label htmlFor="show">
                                    {/* <input id="show" type="checkbox">
                                        Show me difference
                                    </input> */}
                                </label>
                            </td>
                            {this.selectedItems.length > 0 && this.selectedItems.map((idx, index) => {
                                return (
                                    <td className="bordernone" key={index}>
                                        <div className="imgbox">
                                            <img src={idx.itemImage} alt={index} />
                                            {index !== 0 && <span className="close" onClick={e => {this.removeItem(e, idx)}}>x</span>}
                                        </div>
                                        <h3>{idx.itemName['title']}</h3>
                                        <div className="price">
                                            <strong>&#8377;{idx.itemPriceSummary[this.state.itemId]['price']}</strong>
                                            <del>&#8377;{idx.itemPriceSummary[this.state.itemId]['finalPrice']}</del>
                                            <span>{idx.itemPriceSummary[this.state.itemId]['totalDiscount']}% off</span>
                                        </div>
                                    </td>
                                )
                            })}
                            {this.selectedItems.length !== 4 && <td className="bordernone" width="100">
                                <div className="imgbox imgbox_no">
                                    &nbsp;
                                </div>
                                <h3>Add Product </h3>
                                <select name="addItem" id="addItem" onChange={e => { this.selectItem(e, this.state.itemNames) }}>
                                   <option value="">Select a product</option>
                                    {this.state.itemNames && Object.keys(this.state.itemNames).map(key => {
                                        return (
                                            <React.Fragment>
                                            <option value={key} key={key}>{this.state.itemNames[key].title}</option>
                                            </React.Fragment>
                                        )
                                    })}

                                </select>
                            </td>}
                        </tr>
                        <tr>
                        <th colspan="5">DISPLAY</th>
                        </tr>
                        <tr>
                            <td className="bold">Size</td>
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
                            <td className="bold">Screen Type</td>
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
                            <td className="bold">HD Technology and Resolution</td>
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
                            <td className="bold">Smart TV</td>
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
                            <td className="bold">Curve TV</td>
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
                            <td className="bold">TouchScreen</td>
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
                            <td className="bold">Monitor Sensor</td>
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
                            <td className="bold">Launch year</td>
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
                            <td className="bold">In the Box</td>
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
                            <td className="bold">Build-in-Wifi</td>
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
                            <td className="bold">Wireless Ready</td>
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
                            <td className="bold">3G Dongale Plug and Play</td>
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