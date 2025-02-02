import { useList } from "@refinedev/core";
import { Typography, Box, Stack } from "@mui/material";
import React, { useState, useEffect } from 'react';
import {
    PieChart,
    PropertyCard,
} from "components";

const Home = () => {
    const { data, isLoading, isError } = useList({
        resource: "products",
        config: {
            pagination: {
                pageSize: 4,
            },
        },
    });

    const [totalRevenue, setTotalRevenue] = useState(0);
    const [TotalCustomers, setTotalCustomers] = useState(0);
    const [count, setcount] = useState(0);
    const [TotalProduct, setTotalProduct] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/auth/total-revenue')
          .then(response => response.json())
          .then(data => setTotalRevenue(data.totalRevenue))
          .catch(error => console.error(error));
      }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/auth/customer-count')
          .then(response => response.json())
          .then(data => setTotalCustomers(data.TotalCustomers))
          .catch(error => console.error(error));
      }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/auth/off-season-products')
          .then(response => response.json())
          .then(data => setcount(data.count))
          .catch(error => console.error(error));
      }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/auth/total-product')
          .then(response => response.json())
          .then(data => setTotalProduct(data.TotalProduct))
          .catch(error => console.error(error));
    }, []);

    const latestProperties = data?.data ?? [];

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong!</Typography>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Dashboard
            </Typography>

            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Products for Sale"
                    value={TotalProduct}
                    series={[79, 21]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Total Revenue"
                    value={totalRevenue}
                    series={[32, 68]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Total customers"
                    value={TotalCustomers}
                    series={[90, 10]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Off-season Products"
                    value={count}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
            </Box>

            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize="18px" fontWeight={600} color="#11142d">
                    Latest Products
                </Typography>

                <Box
                    mt={2.5}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                    {latestProperties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            location={property.location}
                            price={property.price}
                            photo={property.photo}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
