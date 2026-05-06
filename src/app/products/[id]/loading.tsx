import React from "react"
 import ContentLoader from "react-content-loader"

  const loading = (props: React.ComponentProps<typeof ContentLoader>) => (
    <ContentLoader 
      className="w-full h-full"
      speed={2}
      width={476}
      height={124}
      viewBox="0 0 476 124"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="186" y="14" rx="3" ry="3" width="88" height="6" /> 
      <rect x="186" y="32" rx="3" ry="3" width="52" height="6" /> 
      <rect x="187" y="57" rx="3" ry="3" width="410" height="6" /> 
      <rect x="187" y="73" rx="3" ry="3" width="380" height="6" /> 
      <rect x="187" y="89" rx="3" ry="3" width="178" height="6" /> 
      <rect x="11" y="6" rx="0" ry="0" width="136" height="108" />
    </ContentLoader>
  )

 export default loading


