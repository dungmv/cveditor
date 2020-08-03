const ToolBox = ({drag}) => {
    return (
        <div className="section-actions section-0">
            <div className="section-action-wrapper" draggable="true" ref={drag}>
                <i className="fa fa-arrows-alt section-action draggable"></i>
            </div>
            <div className="section-action-wrapper" title="Di chuyển mục này lên trên">
                <i className="fa fa-caret-up section-action"></i>
            </div>
            <div className="section-action-wrapper" title="Di chuyển mục này xuống dưới">
                <i className="fa fa-caret-down section-action"></i>
            </div>
            <div className="section-action-wrapper" title="Thêm">
                <div className="section-action add-sub-section-action"><i className="fa fa-plus-circle fa-lg fa-fw"></i>Thêm</div>
            </div>
            <div className="section-action-wrapper" title="Ẩn mục này">
                <div className="section-action hide-section-button"><i className="fa fa-minus-circle fa-lg fa-fw"></i>Ẩn</div>
            </div>
        </div>
    )
}

export default ToolBox;
