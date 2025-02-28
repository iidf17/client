import { FC } from "react";
import { Layout } from '../../components/layouts'

export const NoPermission: FC = () => {
    return(
        <Layout title="Base">     
            <h3>No permission</h3>
            <h4>Please, call an admin to solve your problem</h4>
        </Layout>
    );
}