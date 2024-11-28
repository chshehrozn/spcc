import axios from "axios";
import toast from "react-hot-toast";

export const getProfileData = async (token) => {
  if (token) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.log("getting projects list error....", error);
      return error;
    }
  }
};

export const createSite = async (token, formData) => {
  if (token && formData) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/sites/store`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.log("create site error....", error);
      toast.error("Something went wrong!");
      return error;
    }
  }
};

export const updateSite = async (token, formData, id) => {
  if (token && formData) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/sites/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.log("update site error....", error);
      toast.error("Something went wrong!");
      return error;
    }
  }
};

export const getVendorSites = async (token, vendor_id, setLoading) => {
  if (token && vendor_id) {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/vendorssites/find/${vendor_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      return response?.data;
    } catch (error) {
      console.log("getting vendor site error....", error);
      setLoading(false);
      return error;
    }
  }
};

export const getProjects = async (token, setLoading) => {
  if (token) {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/societies`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      return response?.data;
    } catch (error) {
      setLoading(false);
      console.log("getting projects list error....", error);
      return error;
    }
  }
};
export const getSingleProject = async (token, sot_id, setLoading) => {
  if (token) {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/societies/find/${sot_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      return response?.data;
    } catch (error) {
      setLoading(false);
      console.log("getting projects list error....", error);
      return error;
    }
  }
};

export const createProject = async (token, formData) => {
  if (token && formData) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/societies/store`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.log("create site error....", error);
      toast.error("Something went wrong!");
      return error;
    }
  }
};

export const updateProject = async (sot_id, token, formData) => {
  if (token && formData) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/societies/update/${sot_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.log("update site error....", error);
      toast.error("Something went wrong!");
      return error;
    }
  }
};

export const createCustomer = async (token, formData) => {
  if (token && formData) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/customers/store`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.log("create customer error....", error);
      toast.error("Something went wrong!");
      return error;
    }
  }
};

export const updateCustomer = async (cus_id, token, formData) => {
  if (token && formData) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/customers/update/${cus_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      console.log("update Customer error....", error);
      toast.error("Something went wrong!");
      return error;
    }
  }
};

export const getExpensesReport = async ({
  token,
  fromDate,
  toDate,
  acc_id,
  setLoading,
}) => {
  if (token) {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/reports?startdate=${fromDate}&enddate=${toDate}&acc_id=${acc_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      return response?.data;
    } catch (error) {
      console.log("expenses report error....", error);
      setLoading(false);
      return error;
    }
  }
};
